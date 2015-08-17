    var chart;
    var idx;


    function draw(game, keyword, sentiment) {
        $("#chart1").empty();
        nv.addGraph(function() {
            chart = nv.models.lineChart()
                .margin({left: 80})
                .showYAxis(true)
                .options({
                    transitionDuration: 300,
                    useInteractiveGuideline: true
                })
            ;
            chart.xScale(d3.time.scale()),
            // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
            chart.xAxis
                .axisLabel("Month")
                .ticks(d3.time.months)
                .tickFormat(function(d) {
                    return d3.time.format('%Y-%m')(new Date(d))
                })
            ;

            chart.yAxis
                .axisLabel("Count")
            ;

            d3.select('#chart1').append('svg')
                .datum(generateDataToDraw(game,keyword,sentiment))
                .call(chart);

            nv.utils.windowResize(chart.update);

            return chart;
        },function(){
            d3.selectAll(".nv-point").on('click', function(e){
                idx = d3.time.format('%Y-%m')(new Date(e['x']));
                $.cookie("idx", idx); 
            });
        });

    }

    function sent_count(game, keyword, month_index) {
        var magic = month_index;
        var neu = 0;
        var pos = 0;
        var neg = 0;
        if (magic == undefined) {
            if (keyword == undefined) {
                for (c in game) {
                    if (c != 'name') {
                        neu += game[c]['neutral'].length;
                        pos += game[c]['pos'].length;
                        neg += game[c]['neg'].length;
                    }
                }
            }
            else {
                for (c in game) {
                    if (c != 'name') {
                        for (var d=0; d<game[c]['neutral'].length; d++) {
                           if (game[c]['neutral'][d][1].search(new RegExp(keyword, 'i')) != -1) {
                                neu += 1
                           }
                        }
                        for (var d=0; d<game[c]['pos'].length; d++) {
                           if (game[c]['pos'][d][1].search(new RegExp(keyword, 'i')) != -1) {
                                pos += 1
                           }
                        }
                        for (var d=0; d<game[c]['neg'].length; d++) {
                           if (game[c]['neg'][d][1].search(new RegExp(keyword, 'i')) != -1) {
                                neg += 1
                           }
                        }   
                    }                                     
                }      
            }
        }
        else {
            if (keyword == undefined) {
                if (magic in game) {
                    neu += game[magic]['neutral'].length;
                    pos += game[magic]['pos'].length;
                    neg += game[magic]['neg'].length;
                }
            }
            else {
                if (magic in game) {
                    for (var d=0; d<game[magic]['neutral'].length; d++) {
                        if (game[magic]['neutral'][d][1].search(new RegExp(keyword, 'i')) != -1) {
                            neu += 1
                        }
                    }
                    for (var d=0; d<game[magic]['pos'].length; d++) {
                        if (game[magic]['pos'][d][1].search(new RegExp(keyword, 'i')) != -1) {
                            pos += 1
                        }
                    }
                    for (var d=0; d<game[magic]['neg'].length; d++) {
                        if (game[magic]['neg'][d][1].search(new RegExp(keyword, 'i')) != -1) {
                            neg += 1
                        }
                    }   
                }                             
            }                        
        }
                var all_count = {
                    "neu": neu,
                    "pos": pos,
                    "neg": neg
                };
                return all_count;
    }
       function show_tweet(game, keyword, sentiment, magic) {
            tweet_array = [];
            if (magic == undefined) {
                m = '2015-02';
            }
            else {
                m = magic;
            }
            if (m in game) {
                if (keyword == undefined) {
                    if (sentiment == undefined) {
                        for (label in game[m]) {
                            for (var e=0; e<game[m][label].length; e++) {
                                tweet_array.push([game[m][label][e][1],game[m][label][e][2]])  
                            }                        
                        }
                    }
                    else {
                        for (var e=0; e<game[m][sentiment].length; e++) {
                            tweet_array.push([game[m][sentiment][e][1],game[m][sentiment][e][2]])  
                        }                          
                    }
                }
                else {
                    if (sentiment == undefined) {
                        for (var e=0; e<game[m][label].length; e++) {
                            if (game[m][label][e][1].search(new RegExp(keyword, 'i')) != -1) {
                                tweet_array.push([game[m][label][e][1],game[m][label][e][2]]) 
                            }                         
                        }                         
                    }
                    else {
                        for (var e=0; e<game[m][sentiment].length; e++) {
                            if (game[m][sentiment][e][1].search(new RegExp(keyword, 'i')) != -1) {
                                tweet_array.push([game[m][sentiment][e][1],game[m][sentiment][e][2]]) 
                            }                         
                        }                           
                    }               
                }
            }
            return tweet_array;
        }
    idx = "2015-02";

    month = ["2014-01","2014-02","2014-03","2014-04","2014-05","2014-06","2014-07","2014-08","2014-09","2014-10","2014-11","2014-12","2015-01","2015-02"];
    month_new = [new Date(2014, 0),new Date(2014, 1),new Date(2014, 2),new Date(2014, 3),new Date(2014, 4),new Date(2014, 5),new Date(2014, 6),new Date(2014, 7),new Date(2014, 8),new Date(2014, 9),new Date(2014, 10),new Date(2014, 11),new Date(2015, 0),new Date(2015, 1)];

    function generateDataToDraw(game, keyword, sentiment) {
        v = [];
        for (var a=0; a<month.length; a++) {
            temp = {};
            temp['x'] = month_new[a];
            count = 0;            
            if (sentiment == undefined) {
                if (game[month[a]] != undefined) {
                    for (label in game[month[a]]) {
                        if (keyword == undefined) {
                            count += game[month[a]][label].length;
                        }
                        else {
                            for (var b=0; b<game[month[a]][label].length; b++) {
                                if (game[month[a]][label][b][1].search(new RegExp(keyword,'i')) != -1) {
                                    count += 1
                                }
                            }
                        }
                    }
                }                           
            }
            else {
                if (game[month[a]] != undefined) {                
                    if (keyword == undefined) {
                        count += game[month[a]][sentiment].length
                    }
                    else {
                        for (var b=0; b<game[month[a]][sentiment].length; b++) {
                            if (game[month[a]][sentiment][b][1].search(new RegExp(keyword,'i')) != -1) {
                                count += 1
                            }                            
                        }
                    }                    
                }  
            }
            temp['y'] = count;
            v.push(temp);
        }       
        return [{
            values: v,
            key: game['name'],
        }];
    }


