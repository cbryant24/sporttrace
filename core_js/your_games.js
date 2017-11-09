$('document').ready( () => {
    // $.ajax({
    //     url: 'php.data',
    //     type: 'get',
    //     dataType: 'json',
    //     success(data){
    //         display_games.load_games(data)
    //     }

    // })
    your_games.load_games();
    $('.joinbtn').on('click', function(event){
        event.preventDefault();
    })

    $('.viewbtn').on('click', function(event){
        const { latitude, longitude } = this.game
        
        event.preventDefault();
        marker.setMap(null);
        var myLatLng = {lat: latitude, lng: longitude}
        marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            // title: 'Hello World!'
        });
        map.setCenter(marker.getPosition());
        map.setZoom(18);
        cancel_game.load_display(this);
    })
})

var map;
var marker;


function myMap() {
    // creation of the new Find Game object
    cancel_game = new Cancel_Game;
    your_games = new Your_Games();
    
    var mapProp= {
        center:new google.maps.LatLng(33.552085,-117.666035),
        zoom:9,
        gestureHandling: 'greedy'
    };
    var mapCanvas = document.getElementById("googleMap");
    map = new google.maps.Map(mapCanvas, mapProp);
    var myCenter = new google.maps.LatLng(33.552085, -117.666035);

    var myLatLng = {lat: 33.552085, lng: -117.666035}

    marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        // title: 'Hello World!'
    });

    // var infowindow = new google.maps.InfoWindow();
    
    // var marker, i;
    // for (i = 0; i < your_games.all_games.length; i++) {  
    //     marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(your_games.all_games[i][1], your_games.all_games[i][2]),
    //     map: map
    //     });

    //     google.maps.event.addListener(marker, 'click', (function(marker, i) {
    //         return function() {
    //             infowindow.setContent(your_games.all_games[i][0]);
    //             infowindow.open(map, marker);
    //         }
    //     })(marker, i));
    // }    
}


function Your_Games() {
    this.complete_games = [{
        game_title: ' Ballers ',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum, ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti dolorem id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto impedit laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae tempore tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
        latitude:  33.835,
        longitude:  -117.914,
        game_time: ' 7:30 ',
        game_date: '11/12/2017',
        vibe: ' casual ',
        game_id: 5
   },
   {
       game_title: ' Brick City ',
       description: ' optio quae! Deleniti dolorem id maiores minima nostrum obcaecati reiciendis, ' +
       'rem ullam velit vero. Accusamus aliquid architecto impedit laboriosam, quas saepe vero. Animi ' +
       'beatae doloremque doloribus exercitationem ipsa molestias quae tempore tenetur totam voluptates? ' +
       'Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis doloribus ea eos ' +
       'eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, quo rerum ' +
       'sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
       latitude:  34.068921,
       longitude:  -118.445181,
       game_time: ' 9:00 ',
       game_date: '11/12/2017',
       vibe: 'casual ',
       game_id: 4
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
       latitude: 34.043017,
       longitude: -118.267254,
       game_time: ' 10:00 ',
       game_date: '11/12/2017',
       vibe: 'casual ',
       game_id: 3
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
       latitude: 36.1699,
       longitude: 115.1398,
       game_time: ' 12:00 ',
       game_date: '11/12/2017',
       vibe: ' casual ',
       game_id: 2
   },
   {
       game_title: 'Bitches and Ballers',
       description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum,' +
       ' ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti ' +
       'dolorem id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto ' +
       'impedit laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae ' +
       'tempore tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid ' +
       'corporis doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat ' +
       'quam quasi, quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem.',
       latitude: 32.775722,
       longitude: -117.071889,
       game_time: ' 18:00 ',
       game_date: '11/12/2017',
       vibe: ' competitive ',
       game_id: 1
   }];
    this.all_games = [
        ['Bondi Beach', 33.552085, -117.666035, 4],
    ];

    this.load_games = function(){
        this.complete_games.sort( (a,b) => {
            return a.game_id - b.game_id
        } )
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
                text: 'View Info',
            })
            let view_button = $view_button[0];
            view_button.game = this.complete_games[i];
            $single_game.append($game_title, $game_time, $game_vibe);
            $view_div.append($view_button);
            $single_game.append($view_div);
            $game_list_container.append($single_game);
        }
        cancel_game.load_display(this.complete_games[0])
    }
}

//Need to check if they already have an active game on there profile
function Cancel_Game() {
    this.load_display = function(game_selected) {
        $('.gameinfobox').empty()
        let $gameinfobox = $('.gameinfobox')
        let $game_title = $('<h3>', {
            text: game_selected.game_title || game_selected.game.game_title
        })
        let $game_descr = $('<p>',{
            text: game_selected.description || game_selected.game.description,
        })
        let $game_date = $('<h6>', {
            text: `${game_selected.game_date || game_selected.game.game_date} ${game_selected.game_time || game_selected.game.game_time}`
        })
        // let $cancel_btn = $('<a>', {
        //     href: '#',
        //     class: 'btn btn-outline btn-xl joinbtn',
        //     text: 'Cancel'
        // })
        // let game = $cancel_btn[0];
        // game.id = game_selected.game_id || game_selected.game.game_id
        $gameinfobox.append($game_title, '<hr>', $game_descr, $game_date, '<hr>');
    }
}

var your_games = null;
var cancel_game = null;