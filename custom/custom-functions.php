<?php
/*  Enqueue javascript
/* ------------------------------------ */

function nextframe_scripts() {

    wp_enqueue_script( 'NextFrame-bundle', get_template_directory_uri() . '/custom/bundle.min.js','','', true );

    wp_enqueue_script( 'NextFrame-scripts', get_template_directory_uri() . '/custom/custom-scripts.js','','', true );
  
    //if ( is_singular() && get_option( 'thread_comments' ) )	{ wp_enqueue_script( 'comment-reply' ); }
  
  }
  
  add_action( 'wp_enqueue_scripts', 'NextFrame_scripts' );
  

/*  Enqueue css
/* ------------------------------------ */

function NextFrame_custom_styles() {

	wp_enqueue_style( 'NextFrame-custom-style', get_template_directory_uri().'/custom/custom-style.css');

  wp_enqueue_style( 'NextFrame-custom-font-1', 'https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,300;0,400;0,500;1,100;1,300;1,400;1,500&display=Font-1');

  wp_enqueue_style( 'NextFrame-custom-font-2', 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500&display=Font-2');
  
  wp_enqueue_style( 'NextFrame-custom-font-3', 'https://fonts.googleapis.com/css2?family=MonteCarlo&display=Font-3');


}

add_action( 'wp_enqueue_scripts', 'NextFrame_custom_styles' );



/*  Custom shortcode
  /* ------------------------------------ */
  function galleria_shortcode() {

    global $post;

    $buffer = '<div class="demartis-container"><div class="demartis-gallery">'; // apertura tag slider
    
    //wp query custom loop
    $custom_loop = new WP_Query( array(
      'post_type'      => 'gallery', 
      'posts_per_page' => 100,
      'orderby'        => 'menu_order',
      'order'          => 'ASC',
    ));
    
    if ($custom_loop->have_posts()) : while($custom_loop->have_posts()) : $custom_loop->the_post(); //apertura loop
    
    $image_attributes =  wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'large' );

    $buffer .= '<div class="demartis-gallery-item">';
      $buffer .= '<img class="demartis-gallery-image" src=" '.$image_attributes[0].' " alt=""/>';
    $buffer .= '</div>';

    wp_reset_postdata(); //reset della query
    endwhile; endif; // chiusura loop

    $buffer .= '</div></div>'; // chiusura tag slider

    return $buffer;
  }
  add_shortcode('gallery', 'galleria_shortcode');

?>
