<?php
    header('Content-Type: application/json');
    $mysqli = new mysqli('localhost','root','re4RE$re4','nokiatwin');
    $post = json_decode(file_get_contents('php://input'), true);

    $type = $mysqli->real_escape_string($post['type']);


//build query for filter type results
    $myArray = array();
    $conditions = array();
    $selectors = array();
    $metric = '';
    if (!empty($post['metric']) && isset($post['metric'])) {
      $metric = $mysqli->real_escape_string($post['metric']);
    }
    if (!empty($post['company'])) {
      $company = $mysqli->real_escape_string($post['company']);
      $conditions[] = " company = '$company' ";
    }
    if (!empty($post['country'])) {
      $country = $mysqli->real_escape_string($post['country']);
      $conditions[] = " country = '$country' ";
    }
    if (!empty($post['employee_title']) && isset($post['employee_title'])) {
      $employee_title = $mysqli->real_escape_string($post['employee_title']);
      $conditions[] = " employee_title = '$employee_title' ";
    }

    $conditions[] = " TRUE ";
    $selectors[] = "count(*) as c";
    $selectors[] = 'round(avg('.$metric.'),1) as r';
    $selectors[] = "DATE_FORMAT(date, '%Y-%m') as d";

//build query for list of items in selectors and typeahead
    $listSelector = '';
    if (!empty($post['listSelector']) && isset($post['listSelector'])) {
      $listSelector = $mysqli->real_escape_string($post['listSelector']);
    }



//select query based on type and send to db

    $query = '';
    switch($type) {
      case 'result':
        $query = "SELECT
        ".implode(",",$selectors)."
        from reviews
        WHERE ".implode(' AND', $conditions )."
        GROUP BY d
        ORDER BY d ASC
        ";
        break;

      case 'selectors':
        $query = "
        select count(*) as count, ".$listSelector."
        from reviews
        where ".$listSelector." !=''
        group by ".$listSelector."
        order by count(*) desc
      ";
    }

    //print $query;


    if ($result = $mysqli->query($query)) {

        $str = "";

          while ($column = mysqli_fetch_field($result)) {
            $str .= $column->name;
            $str .= ",";
        }
        $str .= "\n";
        //$str .= "<br>";

        while($row = $result->fetch_array(MYSQLI_ASSOC)) {
            $myArray[] = $row;
            /*foreach($row as $value) {
            }
            $str .= "\n";*/
        }
        echo json_encode($myArray);
    }

    $result->close();
    $mysqli->close();
?>
