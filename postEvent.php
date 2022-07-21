<?php
    echo "Event Posted";
    if ($_SERVER['REQUEST_METHOD'] == 'POST'){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $event_name = $_POST['event_name'];
        $info = $_POST['info'];
        
      
      // Connecting to the Database
      $servername = "localhost";
      $username = "root";
      $password = "";
      $database = "events";

      // Create a connection
      $conn = mysqli_connect($servername, $username, $password, $database);
      // Die if connection was not successful
      if (!$conn){
          die("Sorry we failed to connect: ". mysqli_connect_error());
      }
      else{ 
        // Submit these to a database
        // Sql query to be executed 
        $sql = "INSERT INTO `data` (`user_name`, `email`, `phone`, `event_name`, `info`) VALUES ('$name', '$email', '$phone', '$event_name', '$info')";
        $result = mysqli_query($conn, $sql);
 
        if($result){
          echo '<div class="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Success!</strong> Your entry has been submitted successfully!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>';
        }
        else{
            // echo "The record was not inserted successfully because of this error ---> ". mysqli_error($conn);
            echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Error!</strong> We are facing some technical issue and your entry ws not submitted successfully! We regret the inconvinience caused!
          <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true"></span>
          </button>
        </div>';
        }

      }

    }

    
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Event Organizing Portal</title>
    <link rel="stylesheet" href="style.css">
    <style>
    @import url(https://fonts.googleapis.com/css?family=Roboto:400,300,600,400italic);
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-font-smoothing: antialiased;
      -o-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }
    
    body {
      font-family: "Roboto", Helvetica, Arial, sans-serif;
      font-weight: 100;
      font-size: 12px;
      line-height: 30px;
      color: #0E185F;
      background: #ffffff;
    }
    
    .container {
      max-width: 400px;
      width: 100%;
      margin: 0 auto;
      position: relative;
    }
    
    #contact input[type="text"],
    #contact input[type="email"],
    #contact input[type="tel"],
    #contact input[type="url"],
    #contact textarea,
    #contact button[type="submit"] {
      font: 400 12px/16px "Roboto", Helvetica, Arial, sans-serif;
    }
    
    #contact {
      background: #E8FFC2;
      padding: 25px;
      margin: 150px 0;
      box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
    }
    
    #contact h3 {
      display: block;
      font-size: 30px;
      font-weight: 300;
      margin-bottom: 10px;
    }
    
    #contact h4 {
      margin: 5px 0 15px;
      display: block;
      font-size: 13px;
      font-weight: 400;
    }
    
    fieldset {
      border: medium none !important;
      margin: 0 0 10px;
      min-width: 100%;
      padding: 0;
      width: 100%;
    }
    
    #contact input[type="text"],
    #contact input[type="email"],
    #contact input[type="tel"],
    #contact input[type="url"],
    #contact textarea {
      width: 100%;
      border: 1px solid #0E185F;
      background: #E8FFC2;
      margin: 0 0 5px;
      padding: 10px;
    }
    
    #contact input[type="text"]:hover,
    #contact input[type="email"]:hover,
    #contact input[type="tel"]:hover,
    #contact input[type="url"]:hover,
    #contact textarea:hover {
      -webkit-transition: border-color 0.3s ease-in-out;
      -moz-transition: border-color 0.3s ease-in-out;
      transition: border-color 0.3s ease-in-out;
      border: 1px solid #0E185F;
    }
    
    #contact textarea {
      height: 100px;
      max-width: 100%;
      resize: none;
    }
    
    #contact button[type="submit"] {
      cursor: pointer;
      width: 100%;
      border: none;
      background: #0E185F;
      color: #E8FFC2;
      margin: 0 0 5px;
      padding: 10px;
      font-size: 15px;
      border: 1px solid #0E185F;
      text-decoration: none;
    }
    
    #contact button[type="submit"]:hover {
      background: #E8FFC2;
      color: #0E185F;
      -webkit-transition: background 0.3s ease-in-out;
      -moz-transition: background 0.3s ease-in-out;
      transition: background-color 0.3s ease-in-out;
    }
    
    #contact button[type="submit"]:active {
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.5);
    }
    
    .copyright {
      text-align: center;
    }
    
    #contact input:focus,
    #contact textarea:focus {
      outline: 0;
      border: 1px solid #0E185F;
    }
    
    ::-webkit-input-placeholder {
      color: #0E185F;
    }
    
    :-moz-placeholder {
      color: #0E185F;
    }
    
    ::-moz-placeholder {
      color: #0E185F;
    }
    
    :-ms-input-placeholder {
      color: #0E185F;
    }
    </style>
</head>


<body>
<div class="container">  


    <form  action="postEvent.php" method="post">
      <h3>Create your Event</h3>
      <h4>Contact us for custom quote</h4>
      <fieldset>
        <input placeholder="Your name" type="text" tabindex="1" required autofocus name="name">
      </fieldset>
      <fieldset>
        <input placeholder="Your Email Address" type="email" tabindex="2" required name="email">
      </fieldset>
      <fieldset>
        <input placeholder="Your Phone Number (optional)" type="tel" tabindex="3" required name="phone">
      </fieldset>
      <fieldset>
        <input placeholder="Your event name: " type="text" tabindex="4" required name="event_name">
      </fieldset>
      <fieldset>
        <textarea placeholder="How do you want the event to be?" tabindex="5" required name="info"></textarea>
      </fieldset>
      <fieldset>
        <button name="submit" type="submit" id="contact-submit">  Submit</button>
      </fieldset>

    </form>

  </div>
</body>
</html>
