var app = angular.module('JinxiApp', ['ngRoute', 'ui.bootstrap']);
app.config(function ($routeProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/game/:gamename',
            {
                controller: 'gamesController',
            })
        .otherwise({ redirectTo: '/' });

        // use the HTML5 History API
        
});

app.controller('gamesController', function ($scope, $routeParams, $window) {


    $scope.games = ["GTA","Call of Duty","2k15","HALO","MineCraft","Assassin Creed"];

    $scope.all_keywords = {
        "GTA": ["@youtube", "video", "playlist", "online", "update"],
        "Call of Duty": ["@youtube", "video", "multiplayer", "ghosts"],
        "2k15": ["#nba2k15", "#wwe2k15", "#ps4", "#myteam"],
        "HALO": ["@sirjo5halot", "@grindlethorpe", "@rockmanhalo", "multiplayer"],
        "MineCraft": ["youtube", "survival", "joshgamingz", "bengamingz", "@skydoesminecraf"],
        "Assassin Creed": ["#trueachievement", "trailer", "@youtube", "achievement"]
    };

    $scope.all_tweets = {};

    $scope.selected_game = $scope.games[0];
    $scope.current_keywords = $scope.all_keywords["GTA"];
    $scope.selected_month = "2015-02"
    $scope.searchQuery = "GTA" + " in ";
    $scope.selected_sentiment = "All";
    $scope.selected_game_data = GTA;
    $scope.selected_keyword = undefined;
    draw($scope.selected_game_data, undefined, undefined);

    $scope.sentiment_count = sent_count(GTA);
    $scope.tweets_to_show = show_tweet($scope.selected_game_data, $scope.selected_keyword, undefined, $scope.selected_month);
    // console.log(show_tweet($scope.selected_game_data, $scope.selected_keyword, undefined, $scope.selected_month));
    // console.log($scope.tweets_to_show);
    $scope.isActiveGame = function(game) {
       return $scope.selected_game === game;
    };
    $scope.isActiveKeyword = function(keyword) {
       return $scope.selected_keyword === keyword;
    };


    $scope.generateSearchQuery = function() {
        if ($scope.selected_keyword != undefined) {
            $scope.searchQuery = $scope.selected_game + " + " + $scope.selected_keyword + " in ";
        } else {
            $scope.searchQuery = $scope.selected_game + " in ";
        }
    }

    $scope.toggleKeyword = function(keyword) {
        $scope.selected_keyword = keyword;
        $scope.generateSearchQuery();
        console.log($scope.selected_game, keyword);
        
        $scope.sentiment_count = sent_count($scope.selected_game_data, keyword);
        draw($scope.selected_game_data, keyword, undefined);
        $scope.tweets_to_show = show_tweet($scope.selected_game_data, $scope.selected_keyword, undefined, idx);
    }

    $scope.switchGame = function(game) {
        idx = "2015-02";
        $scope.selected_game = game;
        $scope.current_keywords = $scope.all_keywords[$scope.selected_game];
        $scope.draw($scope.selected_game, $scope.current_keywords);

        $scope.selected_keyword = undefined;
        $scope.generateSearchQuery();   

        switch (game) {
            case "GTA":
                $scope.sentiment_count = sent_count(GTA);
                $scope.selected_game_data = GTA;
                draw(GTA, undefined, undefined);
                break;
            case "Call of Duty":
                $scope.sentiment_count = sent_count(COD);
                $scope.selected_game_data = COD;
                draw(COD, undefined, undefined);
                break;
            case "2k15":
                $scope.sentiment_count = sent_count(TK);
                $scope.selected_game_data = TK;
                draw(TK, undefined, undefined);
                break;
            case "HALO":
                $scope.sentiment_count = sent_count(Halo);
                $scope.selected_game_data = Halo;
                draw(Halo, undefined, undefined);
            break;
            case "MineCraft":
                $scope.sentiment_count = sent_count(Minecraft);
                $scope.selected_game_data = Minecraft;
                draw(Minecraft, undefined, undefined);
            break;
            case "Assassin Creed":
                $scope.sentiment_count = sent_count(AC);
                $scope.selected_game_data = AC;
                draw(AC, undefined, undefined);
            break;
            default:
            break;
        }
        $scope.tweets_to_show = show_tweet($scope.selected_game_data, undefined, undefined, idx); 
    }

    $scope.switchMonth = function(month) {
        var selected_sentiment = undefined;
        if ($scope.selected_sentiment == "All") {
            selected_sentiment = undefined;
        };
        $scope.selected_month = month;
        console.log($scope.selected_month);
        console.log($scope.selected_keyword, $scope.selected_sentiment, $scope.selected_month);
        $scope.tweets_to_show = show_tweet($scope.selected_game_data, $scope.selected_keyword, selected_sentiment, $scope.selected_month);
    }
    $scope.switchSentiment = function(sentiment) {
        // $scope.selected_sentiment = sentiment;
        var selected_sentiment = undefined;
        if (sentiment == "All") {
            $scope.selected_sentiment = "All";
            selected_sentiment = undefined;
        };
        if (sentiment == "Positive") {
            $scope.selected_sentiment = "Positive";
            selected_sentiment = "pos";
        };
        if (sentiment == "Neutral") {
            $scope.selected_sentiment = "Neutral";
            selected_sentiment = "neutral";
        };
        if (sentiment == "Negative") {
            $scope.selected_sentiment = "Negative";
            selected_sentiment = "neg";
        };
        console.log(($scope.selected_sentiment));
        $scope.tweets_to_show = show_tweet($scope.selected_game_data, $scope.selected_keyword, selected_sentiment, $scope.selected_month);
    }
    $scope.draw = function (game, keywords, sentiment) {
        console.log(game, keywords);
    }

    $scope.date_choices = ["2015-02","2015-01","2014-12","2014-11","2014-10","2014-09","2014-08","2014-07","2014-06","2014-05","2014-04","2014-03","2014-02","2014-01"];
    // $cookies.idx = 'first value';

    $scope.sentiment_choices = ["All", "Positive", "Neutral", "Negative"];


});