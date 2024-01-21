<?php get_header(); // insert header.php inclusion  ?>

<main class="grid grid--center overflow">

<div class="col-100">

  <?php if (have_posts()) :?><?php while(have_posts()) : the_post(); // start of the loop ?>

    <!-- loop content -->

    <article class="article">

      <h1><?php the_title(); ?></h1>

      <?php the_post_thumbnail('img-big', array('class' => 'img-res mb-2','alt' => get_the_title())); ?>

      <?php the_content(); ?>

    </article>


  <?php endwhile; else : // if no result dispaly message ?>

    <p><?php esc_html_e('Sorry, no posts matched your criteria.', 'NextFrame'); // dispaly no result message ?></p>

  <?php endif; ?>

  </div>

</main>

<?php get_footer(); // insert footer.php inclusion  ?>

