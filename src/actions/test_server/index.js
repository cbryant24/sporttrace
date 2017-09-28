const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send(JSON.stringify([{
        game_title: ' Ballers ',
        description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aliquid beatae dolorum, ducimus eaque in nemo quo suscipit? A et impedit iusto quidem sit! Aut ea nihil optio quae! Deleniti dolorem id maiores minima nostrum obcaecati reiciendis, rem ullam velit vero. Accusamus aliquid architecto impedit laboriosam, quas saepe vero. Animi beatae doloremque doloribus exercitationem ipsa molestias quae tempore tenetur totam voluptates? Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis doloribus ea eos eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, quo rerum sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
        latitude:  33.835,
        longitude:  -117.914,
        game_time: ' 7:30 ',
        game_date: '11/12/2017',
        vibe: ' casual ',
        game_id: 0
    },
    {
       game_title: ' Brick City ',
       description: ' optio quae! Deleniti dolorem id maiores minima nostrum obcaecati reiciendis, ' +
       'rem ullam velit vero. Accusamus aliquid architecto impedit laboriosam, quas saepe vero. Animi ' +
       'beatae doloremque doloribus exercitationem ipsa molestias quae tempore tenetur totam voluptates? ' +
       'Atque aut doloremque minus modi nihil nisi numquam ullam vitae. A aliquid corporis doloribus ea eos ' +
       'eveniet explicabo harum maxime modi non, officiis omnis pariatur placeat quaerat quam quasi, quo rerum ' +
       'sed sunt tempora! Amet iusto pariatur quos voluptatem. ',
       latitude: 33.7736,
       longitude: 118.0111,
       game_time: ' 9:00 ',
       game_date: '11/12/2017',
       vibe: 'casual ',
       game_id: 0
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
        latitude: 33.8121,
        longitude: 117.9190,
        game_time: ' 10:00 ',
        game_date: '11/12/2017',
        vibe: 'casual ',
        game_id: 0
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
        game_id: 0
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
        latitude: 36.1699,
        longitude: 115.1398,
        game_time: ' 18:00 ',
        game_date: '11/12/2017',
        vibe: ' competitive ',
        game_id: 0
    }]))
})


app.listen(4000, () => {
    console.log('yo we heard you on 4K')
})