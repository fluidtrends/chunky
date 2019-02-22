<?php

/**
 * ChunkyPress enables a Wordpress Site to communicate with a Chunky Cloud.
 * This function saves a post to the Chunky Cloud
 *
 * @link       https://carmel.io/code/chunky/wordpress
 * @since      1.0.0
 *
 * @package    Chunkypress
 * @subpackage Chunkypress/functions
 * @author     I. Dan Calinescu <idancalinescu@gmail.com>
 */
class Chunkypress_function_savepost {

	/**
	 * The plugin loader.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $loader    The main plugin loader.
	 */
	private $loader;

	public function __construct($loader) {
		$this->loader = $loader;
	}

	public function register() {
		$this->loader->add_action( 'save_post', $this, 'post_did_save');
		$this->loader->add_action( 'admin_notices', $this, 'do_show_notice');
	}

	public function postRequest($requestData, $endpoint) {
		$data = json_encode( $requestData );
		$args = array(
			'method' => 'POST',
			'timeout' => 45,
			'httpversion' => '1.0',
			'blocking' => true,
			'cookies' => array(),
			'headers' => array( 'Content-Type' => 'application/json' ),
			'body' => $data
		);

		$options = get_option('ChunkyPress_settings');
		$requestEndpoint = $options['ChunkyPress_cloud_endpoint_' . $endpoint];
		$requestUrl = $options['ChunkyPress_cloud_api_url'] . "/" . $requestEndpoint;

		// Perform the request
		$response = wp_remote_post(esc_url_raw( $requestUrl), $args );

		// Parse the response
		$responseCode = wp_remote_retrieve_response_code( $response );
		$successful = in_array($responseCode, array(200, 201));
		$responseBody = json_decode(wp_remote_retrieve_body( $response ), true);

		return array("successful" => $successful, "error" => $responseBody["errorMessage"]);
	}

	public function performPostSync($postId, $event, $includeContent = false) {
		$post = get_post($postId);
		$postImageUrl = get_the_post_thumbnail_url($postId, 'full');

		// Figure out whether we want to include the content or not
		// $postContent = ($includeContent ? nl2br($post->post_content) : "");

		$siteUrl = get_site_url();
		$restUrl = get_rest_url();
		$postJsonUrl = $restUrl . "wp/v2" . "/" . "posts" . "/" . $post->ID;
		$postHtmlUrl = $post->guid;

		$requestData = array(
			'id' => $post->ID,
			'sourceType' => 'wordpress',
			'sourceUrl' => $siteUrl,
			'postJsonUrl' => $postJsonUrl,
			'postHtmlUrl' => $postHtmlUrl,
			'title' => $post->post_title,
			'date' => $post->post_modified,
			'summary' => $post->excerpt,
			'imageUrl' => $postImageUrl,
			'postType' => $post->post_type
		);

		return $this->postRequest($requestData, 'posts');
	}

	public function post_did_save($post_id) {
		add_filter( 'redirect_post_location', array( $this, 'this_refresh' ) );
    }

	public function this_refresh( $location ) {
		remove_filter( 'this_refresh', array( $this, 'this_refresh' ) );
		return add_query_arg( array('chunkypress_event' => 'post_did_save'), $location );
	}

	public function do_show_notice() {
		if ( !isset( $_GET['chunkypress_event']) || !isset( $_GET['post']) ) {
			return;
		}

		$chunkypress_event = $_GET['chunkypress_event'];
		$postId = $_GET['post'];

		$response = $this->performPostSync($postId, $chunkypress_event);
		$error = ($response["error"] ? 'Error: ' . $response["error"] . "." : "");

		$syncStatus = ($response["successful"] ? "successfully saved" : "failed to save");
		$syncPrompt = ($response["successful"] ? "This post is now available on all devices." : $error . " Please press [Update] to try again.");

		?>
 			<div data-dismissible="disable-done-notice-forever" class="notice notice-<?php echo ($response["successful"] ? "success" : "error"); ?> is-dismissible">
 		       <p><?php esc_html_e("Chunky " . $syncStatus . " this post to your Chunky Cloud. " . $syncPrompt, 'chunkypress' ); ?></p>
 		    </div>
 	    <?php
   }

}
