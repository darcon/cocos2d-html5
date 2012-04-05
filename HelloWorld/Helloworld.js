/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Created by JetBrains WebStorm.
 User: wuhao
 Date: 12-3-8

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var CircleSprite = cc.Sprite.extend({
    _radians:0,
    draw:function(){
        cc.renderContext.fillStyle = "rgba(255,255,255,1)";
        cc.renderContext.strokeStyle = "rgba(255,255,255,1)";

        if(this._radians > 360)
            this._radians = 0;
        cc.drawingUtil.drawCircle(this.getPosition(),30,cc.DEGREES_TO_RADIANS(this._radians),60,false);
    },
    myUpdate:function(dt){
        this._radians += 6;
    }
});


var Helloworld = cc.Layer.extend({
    bIsMouseDown :false,
    helloImg:null,
    helloLb:null,
    circle:null,
    pSprite:null,
    // Here's a difference. Method 'init' in cocos2d-x returns bool, instead of returning 'id' in cocos2d-iphone
    init: function(){
        var selfPointer = this;
        //////////////////////////////
        // 1. super init first
        var test = this._super();
        cc.LOG(test);
        if ( !test )
        {
            return false;
        }

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.

        // add a "close" icon to exit the progress. it's an autorelease object
        var pCloseItem = cc.MenuItemImage.itemFromNormalImage(
            "Resources/CloseNormal.png",
            "Resources/CloseSelected.png",
            this,
            function(){alert("Bye Bye");} );
        pCloseItem.setPosition(cc.canvas.width-20,20);
        var pMenu = cc.Menu.menuWithItems(pCloseItem, null);

        /*
         var pCloseItem = cc.MenuItemImage.itemFromNormalImage(
         "CloseNormal.png",
         "CloseSelected.png",
         this,
         cc.menu_selector(Helloworld.menuCloseCallback) );
         pCloseItem.setPosition( cc.ccp(cc.Director.sharedDirector().getWinSize().width - 20, 20) );

         // create menu, it's an autorelease object
         var pMenu = cc.Menu.menuWithItems(pCloseItem, null);
         pMenu.setPosition( cc.PointZero() );
         this.addChild(pMenu, 1);
         */
        /////////////////////////////
        // 3. add your codes below...

        // add a label shows "Hello World"
        // create and initialize a label
        //var pLabel = cc.LabelTTF.labelWithString("Hello World", "Arial", 24);
        // ask director the window size
        var size = cc.Director.sharedDirector().getWinSize();

        // position the label on the center of the screen
        //pLabel.setPosition( cc.ccp(size.width / 2, size.height - 50) );

        // add the label as a child to this layer
        //this.addChild(pLabel, 1);

        // add "HelloWorld" splash screen"
        /*******************
         var pSprite = cc.Sprite.spriteWithFile("HelloWorld.png");

         // position the sprite on the center of the screen
         pSprite.setPosition( cc.ccp(size.width/2, size.height/2) );

         // add the sprite as a child to this layer
         this.addChild(pSprite, 0);
         *******************/
            //var helloSprite = cc.Sprite.spriteWithFile("helloworld.png");
            //this.addChild(helloSprite,0);

        this.helloLb = cc.LabelTTF.labelWithString("Hello World", "Arial", 24);
        this.helloLb.setPosition(cc.ccp(180,0));
        this.addChild(this.helloLb,5);

        this.pSprite = cc.Sprite.spriteWithFile("Resources/HelloWorld.png");
        this.pSprite.setPosition(cc.ccp(0,0));
        this.pSprite.setIsVisible(true);
        this.pSprite.setAnchorPoint(cc.ccp(0.5,0.5));
        this.pSprite.setScale(0.5);
        this.pSprite.setRotation(180);
        this.addChild(this.pSprite,0);

        var rotateToA = cc.RotateTo.actionWithDuration(2,0);
        var scaleToA = cc.ScaleTo.actionWithDuration(2,1,1);

        this.pSprite.runAction(cc.Sequence.actions(rotateToA,scaleToA));

        this.circle = new CircleSprite();
        this.circle.setPosition(new cc.Point(40,280));
        this.addChild(this.circle,2);
        this.circle.schedule(this.circle.myUpdate,1/60);

        this.helloLb.runAction(cc.MoveBy.actionWithDuration(2.5,cc.ccp(0,280)));

        this.setIsTouchEnabled(true);

        window.addEventListener("resize",function(event){
            if(document.documentElement.clientWidth < 480){
                cc.canvas.width = 480;
            }else{
                cc.canvas.width = document.documentElement.clientWidth - 30;
            }

            if(document.documentElement.clientHeight < 320){
                cc.canvas.height = 320;
            }else{
                cc.canvas.height = document.documentElement.clientHeight - 30;
            }

            var xScale = cc.canvas.width /480;
            var yScale = cc.canvas.height /320;
            if(xScale > yScale){
                xScale = yScale;
            }
            cc.canvas.width = 480 * xScale;
            cc.canvas.height = 320 * xScale;
            cc.renderContext.translate(0,cc.canvas.height);
            cc.renderContext.scale(xScale,xScale);
            cc.Director.sharedDirector().setContentScaleFactor(xScale);
        });
        return true;
    },
    // a selector callback
    menuCloseCallback: function(pSender)
    {
        cc.Director.sharedDirector().end();
    },
    ccTouchesBegan:function(pTouches,pEvent){
        this.bIsMouseDown = true;
    },
    ccTouchesMoved:function(pTouches,pEvent){
        if(this.bIsMouseDown){
            if(pTouches){
                this.circle.setPosition(new cc.Point(pTouches[0].locationInView(0).x,pTouches[0].locationInView(0).y));
            }
        }
    },
    ccTouchesEnded:function(pTouches,pEvent){
        this.bIsMouseDown = false;
    },
    ccTouchesCancelled:function(pTouches,pEvent){
        console.log("ccTouchesCancelled");
    }
});
// there's no 'id' in cpp, so we recommand to return the exactly class pointer
Helloworld.scene = function(){
    // 'scene' is an autorelease object
    var scene = cc.Scene.node();

    // 'layer' is an autorelease object
    var layer = this.node();
    scene.addChild(layer);
    return scene;
};
// implement the "static node()" method manually
Helloworld.node = function(){
    var pRet = new Helloworld();
    if(pRet && pRet.init())
    {
        return pRet;
    }
    else
    {
        pRet = null;
        return null;
    }
};


