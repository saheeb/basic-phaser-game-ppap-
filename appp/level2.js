

var spacefield;
var backgroundv;
var player;
var cursors;
var bullets;
//kalashan ya nahi
var bulletTime = 0;
var fireButton;

var enemies;
var score = 0;
var scoreText;
var winText;
var loseText;
var music;




var level2 = {


	create:function(){
//uper nechay karnay kay liay
	spacefield = game.add.tileSprite(0,0,800,600,'starfield');
	// music = game.add.audio('song');

   // music.play();
	

//raftar background ki
	backgroundv = 4;	

//humara admi
	player = game.add.sprite(game.world.centerX,game.world.centerY + 200, 'player');
	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.collideWorldBounds=true;

//buttons
	cursors = game.input.keyboard.createCursorKeys();

//goliya
	bullets = game.add.group();
	bullets.enableBody = true;
	bullets.physicsBodyType = Phaser.Physics.ARCADE;
//goliya banay kay liay	
	bullets.createMultiple(30,'bullet');
	bullets.setAll('anchor.x', 0.5);
	bullets.setAll('anchor.y',1);
//goliya wapis banay kay liay	
	bullets.setAll('outOfBoundsKill',true);
	bullets.setAll('checkWorldBounds',true);
//waar
	fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
//dushman
	enemies = game.add.group();
	enemies.enableBody = true;
	enemies.physicsBodyType = Phaser.Physics.ARCADE;

	createEnemies2();
	

//khatam phegham
	scoreText = game.add.text(0,550,'ppap:',{font:'32px Arial',fill :'#fff'});
	winText = game.add.text(game.world.centerX,game.world.centerY,'You Win pineapple!',{font:'32px Arial',fill :'#fff'});
	//gayab
	winText.visible = false;
	//haar
	
	loseText = game.add.text(game.world.centerX,game.world.centerY,'forgot the pen noob!',{font:'32px Arial',fill :'#fff'});
	//gayab
	loseText.visible = false;
	


	},
	update:function(){
//takar
	game.physics.arcade.overlap(bullets,enemies,collisionHandler,null,this);
	game.physics.arcade.overlap(enemies,player,collisionplayer,null,this);
	

//raftar
		spacefield.tilePosition.y += backgroundv;

//admi ko roknay kay liay
	player.body.velocity.x = 0;

//button
		if(cursors.left.isDown){
			player.body.velocity.x = -350;
		}

		if(cursors.right.isDown){
			player.body.velocity.x = 350;
		}

		if(fireButton.isDown){
			fireBullet();
		}

//score
		scoreText.text = 'ppap:' + score;

		if(score == 3100){
			winText.visible = true;
			scoreText.visible = true;
		}	

	},


}

//goliya chali ya nahi
function fireBullet(){

	if(game.time.now > bulletTime){
		//pheli goli jo jeaib may group may hai 
		bullet = bullets.getFirstExists(false);
		//goliyo ko admi ki jaga par rakna
		if(bullet){
			bullet.reset(player.x + 14,player.y);
			//raftar goliyo ki nikalnay ki
			bullet.body.velocity.y = -200;
			bulletTime = game.time.now + 700;//20milisec

		}

	}

}


function createEnemies2(){
	// 4 dushman har bar jub tak 4 nahi ho
	for(var y = 0; y< 2; y++){
		for(var x =0; x< 3; x++){
			//dushman akaylay ki jaga
			var enemy = enemies.create(x*200,y*60,'enemy');
			enemy.anchor.setTo(-0.5,-0.5);
		}
	}
//position in middle of map bahi
	enemies.x = 100;
	enemies.y = 50;

//dushman ko hilanay kay liay
	var tween = game.add.tween(enemies).to({x:200, y:450},2000,Phaser.Easing.Linear.None,true,0,1000,true);
	tween.onRepeat.add(descend,this);	

}


function descend(){
	enemies.y +=10;
}

function collisionHandler(bullet,enemy){
	bullet.kill();
	enemy.kill();
	
	score += 100;

	  
     
}

function collisionplayer(player){
	player.kill();


	
	if(player.kill){
			loseText.visible = true;
			scoreText.visible = true;
			fireButton = false;	
	}
}
