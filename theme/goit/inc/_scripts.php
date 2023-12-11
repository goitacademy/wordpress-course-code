<?php
add_action('wp_enqueue_scripts', 'portfolio_scritps');
function portfolio_scritps()
{
    // Styles
    wp_enqueue_style(
        'portfolio-style',
        get_template_directory_uri() . '/assets/scss/app.min.css',
        array(),
        _VERSION
    );

    //Scripts
    wp_enqueue_script('jquery');
    wp_enqueue_script(
        'portfolio-script',
        get_template_directory_uri() . '/assets/js/app.min.js',
        array(),
        _VERSION,
        true
    );
}
