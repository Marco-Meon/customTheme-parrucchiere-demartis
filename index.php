<?php get_header();?>

<div class="spacer"></div>

<main class="grid">

  <div class="col-100">

  <?php if ( is_search() ) { // display serach title if is search page ?>

    <h1>
      <?php esc_html_e( 'Results for: ', 'tothetopweb'); // Display translated result text, escaped for security ?><?php echo $s; // display word of the search ?>
    </h1>

    <?php } else if ( is_category() || is_tag() || is_tax() ) { // display category, tag or taxonomy title if is the relative page ?>

    <h1><?php echo single_cat_title(); // display category,tag or tax title ?></h1>

    <?php } else if ( is_home() ){ // display site name if is home ?>

    <h1> <?php bloginfo('name'); // dispaly site name ?></h1>

    <form method="get" action="<?php echo esc_url(home_url());?>" class="form-search">
      <input type="text" placeholder="<?php esc_attr_e('Search...', 'tothetopweb');?>"name="s">
      <button type="submit">
        <img src="<?php echo get_stylesheet_directory_uri(); ?>/icons/search-outline.svg" alt="Search">
      </button>
    </form>

    <?php } ?>

    </div>


    <?php if (have_posts()) : // if there is posts ?>

    <?php while(have_posts()) : the_post(); // start the loop ?>

    <!-- loop content -->

    <article class="col-33 mt-2">

      <a href="<?php the_permalink();?>" class="text-dark">

        <?php the_post_thumbnail('image-small', array('class' => 'img-res mb-2','alt' => get_the_title())); // display featured image of the post  ?>

        <h3><?php the_title(); // display title of the post  ?></h3>

        <?php the_excerpt(); // display excerpt of the post ?>

      </a>

      <?php the_category(', '); ?>

      <?php the_tags('(', ', ', ')'); ?>

    </article>


    <?php endwhile; // end of the loop dispaly page link if needed  ?>

    <div clas="col-100"><?php previous_posts_link( 'Newer posts' ); // link older posts ?> <?php next_posts_link( 'Older posts' ); // link newer posts ?></div>

    <?php else : // if no result dispaly message ?>

    <div clas="col-100"><?php esc_html_e('Sorry, no posts matched your criteria.', 'tothetopweb'); // dispaly no result message ?></div>

    <?php endif; // end of main if ?>

</main>


<?php get_footer(); // insert footer.php inclusion ?>