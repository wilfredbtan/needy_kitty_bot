const Telegraf = require('telegraf')
const session = require('telegraf/session')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

const bot = new Telegraf(process.env.BOT_TOKEN)

var appetite = 2;
var excitement = 2;

function reset() {
  excitement = 2;
  appetite = 2;
}
// function feedPlay(ctx) {
//   return ctx.reply('<b>feed</b> or <i>play?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('feed', 'feed'),
//       m.callbackButton('play', 'play')
//     ])))
// }
function response() {
  const rand = Math.random()
  if (rand < 0.3) {
    return "nyan nyan";
  } else if (rand < 0.8) {
    return "purr~";
  } else {
    return "hiss!";
  }
}

function dec() {
  excitement -= 1;
  appetite -= 1;
}

bot.help((ctx) => ctx.reply('Meow Meow (I am a needy kitty!)'))
bot.hears('meow', (ctx) => ctx.reply(response()))

bot.start((ctx) => {
  // console.log(ctx);
  //feeding and playtime timer
  setTimeout(x => {
    return ctx.reply('feed or play?', Markup
    .keyboard(["feed", "play"])
    .oneTime()
    .resize()
    .extra())
  }, 10000);
  ctx.replyWithPhoto("https://memegenerator.net/img/instances/65088077/needy-cat-mreoow.jpg", {caption: 'Meow meow meow meow'});
})

bot.hears('feed', (ctx) => {
  appetite += 1;
  if(appetite > 3) {
    ctx.reply('Needy Kitty ate too much. Needy Kitty is dead. \nType /start to revive Needy Kitty.')
    reset();
  } else if(excitement < 0) {
    ctx.reply('Needy Kitty starved to death. \nType /start to revive Needy Kitty.')
    reset();
  } else {
    ctx.reply('yum yum in my tum tum');
  }
})

bot.hears('play', (ctx) => {
  excitement += 1;
  if(excitement > 3) {
    ctx.reply('Needy Kitty died of over-excitement. \nType /start to revive Needy Kitty.')
    reset();
  } else if(excitement < 0) {
    ctx.reply('Needy Kitty died of boredom. \nType /start to revive Needy Kitty.')
    reset();
  } else {
    ctx.reply('meow meow (perform for me human)');
  }
})

bot.launch()
