<?php

/**
 * ChunkyPress enables a Wordpress Site to communicate with a Chunky Cloud.
 *
 * @link       https://carmel.io/code/chunky/wordpress
 * @since      1.0.0
 *
 * @package    Chunkypress
 * @subpackage Chunkypress/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Chunkypress
 * @subpackage Chunkypress/admin
 * @author     I. Dan Calinescu <idancalinescu@gmail.com>
 */
class Chunkypress_Admin {

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * The plugin loader.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $loader    The main plugin loader.
	 */
	private $loader;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct( $plugin_name, $version, $loader ) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
		$this->loader = $loader;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {

		/**
		 * Register the default CSS
		 */

		wp_enqueue_style( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'css/chunkypress-admin.css', array(), $this->version, 'all' );

	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {

		/**
		 * Register the default JavaScript
		 */

		wp_enqueue_script( $this->plugin_name, plugin_dir_url( __FILE__ ) . 'js/chunkypress-admin.js', array( 'jquery' ), $this->version, false );

	}

	public function add_admin_menu() {
		add_menu_page( 'Chunky', 'Chunky', 'manage_options', 'chunky', array($this, 'render_main_options_page') );

	}

	public function settings_init() {
		register_setting( 'pluginPage', 'ChunkyPress_settings' );

		add_settings_section( 'ChunkyPress_pluginPage_section',
			__( 'Chunky Cloud Settings', 'chunkypress' ), array($this, 'settings_cloud_section_callback'), 'pluginPage'
		);

		add_settings_field( 'ChunkyPress_cloud_api_url',
			__( 'API URL:', 'chunkypress' ), array($this, 'settings_cloud_url_render'), 'pluginPage', 'ChunkyPress_pluginPage_section');

		add_settings_field( 'settings_cloud_endpoint_posts_render',
			__( 'Posts endpoint:', 'chunkypress' ), array($this, 'settings_cloud_endpoint_posts_render'), 'pluginPage', 'ChunkyPress_pluginPage_section');
	}

	public function settings_cloud_endpoint_posts_render(  ) {
		$options = get_option( 'ChunkyPress_settings' );
		$ChunkyPress_cloud_endpoint_posts =  $options['ChunkyPress_cloud_endpoint_posts'];
		$ChunkyPress_cloud_endpoint_posts = ($ChunkyPress_cloud_endpoint_posts ? $ChunkyPress_cloud_endpoint_posts : "posts");
		?>
			<input type='text' name='ChunkyPress_settings[ChunkyPress_cloud_endpoint_posts]' size='32' value='<?php echo  $ChunkyPress_cloud_endpoint_posts;?>'>
		<?php
	}

	public function settings_cloud_url_render(  ) {
		$options = get_option( 'ChunkyPress_settings' );
		$ChunkyPress_cloud_api_url = $options['ChunkyPress_cloud_api_url'];
		?>
		<input type='text' name='ChunkyPress_settings[ChunkyPress_cloud_api_url]' size='32' value='<?php echo $ChunkyPress_cloud_api_url;?>'>
		<?php
	}

	public function settings_cloud_section_callback(  ) {
		echo __( 'Specify the details of your Chunky Cloud in order to keep this Wordpress Site in sync with it', 'chunkypress' );
	}

	public function render_main_options_page(  ) {
		?>
		<form action='options.php' method='post'>

			<?php
			settings_fields( 'pluginPage' );
			do_settings_sections( 'pluginPage' );
			submit_button();
			?>
		</form>
		<?php
	}

}
