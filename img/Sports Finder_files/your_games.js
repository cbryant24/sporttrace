$('document').ready(() => {
    // $.ajax({
    //     url: 'php.data',
    //     type: 'post',
    //     dataType: 'json',
    //     success(data){
    //         display_games.load_games(data)
    //     }

    // })
    your_games.load_games();
    cancel_game = new Cancel_Game;
    $('.viewbtn').on('click', function(event){
        event.preventDefault();
        cancel_game.load_display(event)
    })
})

function myMap() {
    //creation of the new Find Game object
    your_games = new Your_Games();

    var mapProp= {
        center:new google.maps.LatLng(33.552085,-117.666035),
        zoom:9,
        gestureHandling: 'greedy'
    };
    var mapCanvas = document.getElementById("googleMap");
    var map = new google.maps.Map(mapCanvas, mapProp);
    var myCenter = new google.maps.LatLng(33.552085, -117.666035);

    var infowindow = new google.maps.InfoWindow();
    
    var marker, i;
    for (i = 0; i < your_games.all_games.length; i++) {  
        marker = new google.maps.Marker({
        position: new google.maps.LatLng(your_games.all_games[i][1], your_games.all_games[i][2]),
        map: map
        });
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(your_games.all_games[i][0]);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
}

function Your_Games() {
    this.complete_games = [{
        game_title: ' Ballers ',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum, ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti dolorem id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto impedit laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae tempore tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
        game_location: {
            latitude:  33.835,
            longitude:  -117.914,
        },
       game_time: ' 7:30 ',
       game_date: '11/12/2017',
       vibe: ' casual ',
   },
   {
       game_title: ' Brick City ',
       description: ' optio quae! Deleniti dolorem id maiores minima nostrum obcaecati reiciendis, ' +
       'rem ullam velit vero. Accusamus aliquid architecto impedit laboriosam, quas saepe vero. Animi ' +
       'beatae doloremque doloribus exercitationem ipsa molestias quae tempore tenetur totam voluptates? ' +
       'Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis doloribus ea eos ' +
       'eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, quo rerum ' +
       'sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
       game_location: {
           latitude: 33.7736,
           longitude: 118.0111,
       },
       game_time: ' 9:00 ',
       game_date: '11/12/2017',
       vibe: 'casual ',
   },
   {
       game_title: ' Buckets ',
       description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum, ' +
       'ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti dolorem ' +
       'id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto impedit ' +
       'laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae tempore ' +
       'tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis ' +
       'doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi,' +
       ' quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
       game_location: {
           latitude: 33.8121,
           longitude: 117.9190,
       },
       game_time: ' 10:00 ',
       game_date: '11/12/2017',
       vibe: 'casual ',
   },
   {
       game_title: ' Ankle Breakers ',
       description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum, ' +
       'ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti dolorem ' +
       'id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto impedit ' +
       'laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae tempore ' +
       'tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis ' +
       'doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, ' +
       'quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
       game_location: {
           latitude: 36.1699,
           longitude: 115.1398,
       },
       game_time: ' 12:00 ',
       game_date: '11/12/2017',
       vibe: ' casual ',
   },
   {
       game_title: 'Bitches and Ballers ',
       description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum,' +
       ' ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti ' +
       'dolorem id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto ' +
       'impedit laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae ' +
       'tempore tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid ' +
       'corporis doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat ' +
       'quam quasi, quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem.',
       game_location: {
           latitude: 36.1699,
           longitude: 115.1398,
       },
       game_time: ' 18:00 ',
       game_date: '11/12/2017',
       vibe: ' competitive ',
   }];
    this.all_games = [
        ['Bondi Beach', 33.552085, -117.666035, 4],
    ];

    this.load_games = function(){
        let $game_list_container = $('.game-list-container');
        let $game_container = $('<div>')
        for(let i = 0; i < this.complete_games.length; i++) {
            let $single_game = $(`<div>`, {
                class: 'single-game row',
                style: 'background',
            })
            let $game_title = $('<div>', {
                class: 'col-3 textpad',
                text: this.complete_games[i].game_title,
            })
            let $game_time = $('<div>', {
                class: 'col-3 textpad',
                text: `${this.complete_games[i].game_time} ${this.complete_games[i].game_date}`
            })
            let $game_vibe = $('<div>', {
                class: 'col-2 textpad',
                text: this.complete_games[i].vibe
            })
            let $view_div = $('<div>', {
                class: 'col-4'
            })
            let $view_button = $('<a>', {
                href: '',
                class: 'btn btn-outline btn-xl viewbtn',
                text: 'Cancel?',
                game_id: i,
                random: `${this.complete_games[i].game_title}|${this.complete_games[i].description}|${this.complete_games[i].game_date}|${this.complete_games[i].game_time}`
            })
            // $('.viewbtn').on('click', cancel_game.display_selected('value'))
            $single_game.append($game_title);
            $single_game.append($game_time);
            $single_game.append($game_vibe);
            $view_div.append($view_button);
            $single_game.append($view_div);
            $game_list_container.append($single_game);
        }
    }
}

//Need to check if they already have an active game on there profile
function Cancel_Game() {
    this.load_display = function(game_details) {
        
        let $gameinfobox = $('.gameinfobox')
        let game_arr = game_details.target.attributes[3].textContent.split('|');
        let $game_title = $('<h3>', {
            text: game_arr[0]
        })
        let $game_descr = $('<p>',{
            text: game_arr[1],
        })

        let $game_date = $('<h6>', {
            text: `${game_arr[2]} ${game_arr[3]}`
        })

        let $cancel_btn = $('<a>', {
            href: '#',
            class: 'btn btn-outline btn-xl joinbtn',
            text: 'Cancel'
        })
        $gameinfobox.append($game_title);
        $gameinfobox.append('<hr>');
        $gameinfobox.append($game_descr);
        $gameinfobox.append($game_date);
        $gameinfobox.append('<hr>');
        $gameinfobox.append($cancel_btn);
        
    }
    this.load_click = function() {
        
    }
    this.cancel_click = function() {

    }
}

var your_games = null;
var cancel_game = null;