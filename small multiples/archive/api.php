<?php
    header('Content-type: text/html');
    $mysqli = new mysqli('localhost','root','','nokiatwin');
    $myArray = array();
    $get = $mysqli->real_escape_string($_GET['query']);

    $grouped = "
        SELECT 
        company,
        date,
        country,
        
        count(*) as count,
        round(avg(rating_overall),3) as overall,
        round(avg(rating_balance),3) as balance,
        round(avg(rating_culture),3) as culture,
        round(avg(rating_career),3) as career,
        round(avg(rating_comp),3) as comp,
        round(avg(rating_mgmt),3) as mgmt,
        
        round(avg((ifnull(review_title_knowledge, 0) + ifnull(pros_knowledge, 0) + ifnull(cons_knowledge, 0) + ifnull(advice_to_mgmt_knowledge, 0)) / 4), 5) as knowledge,
        round(avg((ifnull(review_title_power, 0) + ifnull(pros_power, 0) + ifnull(cons_power, 0) + ifnull(advice_to_mgmt_power, 0)) / 4), 5) as power,
        round(avg((ifnull(review_title_respect, 0) + ifnull(pros_respect, 0) + ifnull(cons_respect, 0) + ifnull(advice_to_mgmt_respect, 0)) / 4), 5) as respect,
        round(avg((ifnull(review_title_trust, 0) + ifnull(pros_trust, 0) + ifnull(cons_trust, 0) + ifnull(advice_to_mgmt_trust, 0)) / 4), 5) as trust,
        round(avg((ifnull(review_title_social_support, 0) + ifnull(pros_social_support, 0) + ifnull(cons_social_support, 0) + ifnull(advice_to_mgmt_social_support, 0)) / 4), 5) as social_support,
        round(avg((ifnull(review_title_romance, 0) + ifnull(pros_romance, 0) + ifnull(cons_romance, 0) + ifnull(advice_to_mgmt_romance, 0)) / 4), 5) as romance,
        round(avg((ifnull(review_title_similarity, 0) + ifnull(pros_similarity, 0) + ifnull(cons_similarity, 0) + ifnull(advice_to_mgmt_similarity, 0)) / 4), 5) as similarity,
        round(avg((ifnull(review_title_identity, 0) + ifnull(pros_identity, 0) + ifnull(cons_identity, 0) + ifnull(advice_to_mgmt_identity, 0)) / 4), 5) as identity,
        round(avg((ifnull(review_title_fun, 0) + ifnull(pros_fun, 0) + ifnull(cons_fun, 0) + ifnull(advice_to_mgmt_fun, 0)) / 4), 5) as fun,
        round(avg((ifnull(review_title_conflict, 0) + ifnull(pros_conflict, 0) + ifnull(cons_conflict, 0) + ifnull(advice_to_mgmt_conflict, 0)) / 4), 5) as conflict
        
        FROM reviews
        WHERE country is not null and location is not null
        GROUP BY company, date, country
        order by date ASC
        ";

    $yearly  = "
    SELECT year(date) as year, count(*) as count, country,

        round(avg(rating_overall),3) as overall,
        round(avg(rating_balance),3) as balance,
        round(avg(rating_culture),3) as culture,
        round(avg(rating_career),3) as career,
        round(avg(rating_comp),3) as comp,
        round(avg(rating_mgmt),3) as mgmt,
        
        round(avg((ifnull(review_title_knowledge, 0) + ifnull(pros_knowledge, 0) + ifnull(cons_knowledge, 0) + ifnull(advice_to_mgmt_knowledge, 0)) / 4), 5) as knowledge,
        round(avg((ifnull(review_title_power, 0) + ifnull(pros_power, 0) + ifnull(cons_power, 0) + ifnull(advice_to_mgmt_power, 0)) / 4), 5) as power,
        round(avg((ifnull(review_title_respect, 0) + ifnull(pros_respect, 0) + ifnull(cons_respect, 0) + ifnull(advice_to_mgmt_respect, 0)) / 4), 5) as respect,
        round(avg((ifnull(review_title_trust, 0) + ifnull(pros_trust, 0) + ifnull(cons_trust, 0) + ifnull(advice_to_mgmt_trust, 0)) / 4), 5) as trust,
        round(avg((ifnull(review_title_social_support, 0) + ifnull(pros_social_support, 0) + ifnull(cons_social_support, 0) + ifnull(advice_to_mgmt_social_support, 0)) / 4), 5) as social_support,
        round(avg((ifnull(review_title_romance, 0) + ifnull(pros_romance, 0) + ifnull(cons_romance, 0) + ifnull(advice_to_mgmt_romance, 0)) / 4), 5) as romance,
        round(avg((ifnull(review_title_similarity, 0) + ifnull(pros_similarity, 0) + ifnull(cons_similarity, 0) + ifnull(advice_to_mgmt_similarity, 0)) / 4), 5) as similarity,
        round(avg((ifnull(review_title_identity, 0) + ifnull(pros_identity, 0) + ifnull(cons_identity, 0) + ifnull(advice_to_mgmt_identity, 0)) / 4), 5) as identity,
        round(avg((ifnull(review_title_fun, 0) + ifnull(pros_fun, 0) + ifnull(cons_fun, 0) + ifnull(advice_to_mgmt_fun, 0)) / 4), 5) as fun,
        round(avg((ifnull(review_title_conflict, 0) + ifnull(pros_conflict, 0) + ifnull(cons_conflict, 0) + ifnull(advice_to_mgmt_conflict, 0)) / 4), 5) as conflict
    from reviews
    where company = 'nokia' 
    and country is not null
    group by year, country
    order by country desc
    ";

    switch($get) {
        case "all":
            $query = $all;
            break;
        case "yearly":
            $query = $yearly;
            break;
    }

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
            foreach($row as $value) {
                $str .= $value;
                $str .= ",";
            }
            $str .= "\n";
            //$str .= "<br>";
        }
        echo $str;
    }
    
    $result->close();
    $mysqli->close();
?>