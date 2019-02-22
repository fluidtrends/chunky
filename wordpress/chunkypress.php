<?php

/**
 * ChunkyPress enables a Wordpress Site to communicate with a Chunky Cloud.
 *
 * @link              https://carmel.io/code/chunky/wordpress
 * @since             1.0.0
 * @package           Chunkypress
 *
 * @wordpress-plugin
 * Plugin Name:       ChunkyPress
 * Plugin URI:        https://carmel.io/code/chunky/wordpress
 * Description:       ChunkyPress enables your Wordpress Site to communicate with your Chunky Cloud
 * Version:           1.0.0
 * Author:            I. Dan Calinescu
 * Author URI:        http://idancali.io
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       chunkypress
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-chunkypress-activator.php
 */
function activate_chunkypress() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-chunkypress-activator.php';
	Chunkypress_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-chunkypress-deactivator.php
 */
function deactivate_chunkypress() {
	require_once plugin_dir_path( __FILE__ ) . 'includes/class-chunkypress-deactivator.php';
	Chunkypress_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_chunkypress' );
register_deactivation_hook( __FILE__, 'deactivate_chunkypress' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path( __FILE__ ) . 'includes/class-chunkypress.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_chunkypress() {

	$functions = ["savepost"];
	$version = '1.0.0';

	$plugin = new Chunkypress($functions, $version);
	$plugin->run();

}
run_chunkypress();
