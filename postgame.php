<?php include('php/sessionStart.php');?>
<!DOCTYPE html>
<html lang="en">

  <head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Find Pickup Sports Games Locally">
    <meta name="author" content="Nico / Caleb / Chris">

    <title>Sports Finder</title>

    <!-- <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"> -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">

    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="css/sportsfinder.css" rel="stylesheet">

  </head>

  <body id="page-top">

    <!-- Navigation -->
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
      <div class="container">
        <a href="index.php">
          <img src="img/logo2.png" width="190">
        </a>
        <div class="nav-link-box">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="findgame.php">Find Game</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="postgame.php">Post Game</a>
            </li>
            <li class="nav-item">

              <?php include('php/navLogin.php');?>

            </li>
          </ul>
        </div>
      </div>
    </nav>

<!-- CONTENT --><!-- CONTENT --><!-- CONTENT --><!-- CONTENT --><!-- CONTENT -->

  
  
    <header class="masthead">

      <!-- <iframe class="game-map post-map" frameborder="0"
      src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJKZcT2t_n3IARhA7AdKhMkuQ&key=AIzaSyCe4HExhxjnlIrfiI7GrPX_l7ZoFpmwdGM"  allowfullscreen></iframe>
       -->
       <div class='game-map post-map' id="googleMap" style="width:100%;height:400px">
         <!-- this is where the map is -->
       </div>
       <form action="" id='create-game-form'>
          <div class="postgame row">
            <!-- Left -->
            <div class="col-sm-6 col-12">
              <h5>Title</h5>
              <input class="game_title_input" placeholder="Your Title" value='we ballin at saddleback'></input><br>
              <hr>
              <div class="date row">
                  <div class="col-sm-6 col-12">
                    <h5>Time</h5>
                    <input type="time" class="game_time_input" placeholder="Game Time" value='09:00'></input>
                  </div> 

                  <div class="col-sm-6 col-12">
                    <h5>Date</h5>
                    <input type="date" class="game_time_input" id='game_date'placeholder="Game Date" value='2017-09-30'></input> 
                  </div> 
                </div>
              <hr>
              <h5>Vibe</h5>
              <select name="vibe" class="game_vibe_input">
                <option value="casual">Casual</option>
                <option value="competitive">Competitive</option>
              </select>
            </div>
            <!-- Right -->
            <div class="col-sm-6 col-12">
              <h5>Location</h5>
              <input type="text" class="game_time_input" id='pac-input' placeholder="Game Location"></input>
              <hr>
              <h5>Game Description</h5>
              <textarea class="game_description_input" placeholder="Your Description" value='meetup at saddleback yo!'></textarea>

              <a href="#" type='submit' id='submit-button' class="btn btn-outline btn-xl viewbtn postsubmit">Submit</a>
            </div>
          </div>
        </form>

   
          
          
        


    </header>
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyARkl4ZSeJFaXlp38h9_webHWrsOCUMSFM
                    &libraries=places&callback=initAutocomplete"></script>

<!-- CONTENT END --><!-- CONTENT END --><!-- CONTENT END --><!-- CONTENT END -->

<!--     <footer>
      <div class="container">
        <p></p>
        <ul class="list-inline"> -->
<!--           <li class="list-inline-item">
            <a href="#">PRIVACY</a>
          </li>
          <li class="list-inline-item">
            <a href="#">TERMS</a>
          </li>
          <li class="list-inline-item">
            <a href="#">FAQ</a>
          </li> -->
<!--         </ul>
      </div>
    </footer> -->
  </body>

</html>

