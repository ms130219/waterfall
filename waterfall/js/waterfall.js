window.onload=function () {
    //实现瀑布流
    waterFall('main','box');

    //滚动时加载图片
    window.onscroll=function () {
        if(loadImgOrNot()){
            //获取需要加载的数据
            var newArr=[
                {"src":"img5.jpg"},
                {"src":"img2.jpg"},
                {"src":"img1.jpg"},
                {"src":"img7.jpg"},
                {"src":"img11.jpg"},
                {"src":"img8.jpg"},
                {"src":"img16.jpg"},
                {"src":"img12.jpg"},
                {"src":"img5.jpg"},
                {"src":"img9.jpg"},
                {"src":"img2.jpg"},
                {"src":"img14.jpg"}
            ];

            for(var i=0;i<newArr.length;i++){
                //创建标签
                var newBox=document.createElement('div');
                newBox.className='box';
                $('main').appendChild(newBox);

                var newPic=document.createElement('div');
                newPic.className='pic';
                newBox.appendChild(newPic);

                var newImg=document.createElement('img');
                newImg.src='img/'+newArr[i].src;
                newPic.appendChild(newImg);

                //创建之后重新布局
                waterFall('main','box');
            }
        }
    }
};

/**
 * 使盒子呈瀑布流定位
 * @param parent
 * @param child
 */
function waterFall(parent,child) {
    //1 box居中
    //1.1 计算列数
    var boxes=$(parent).getElementsByClassName(child);
    var boxW=boxes[0].offsetWidth;
    var screenW=document.documentElement.clientWidth;
    var cols=parseInt(screenW/boxW);
    //1.2 box居中
    $('main').style.width=boxW*cols+'px';
    $('main').style.margin='0 auto';

    //2 定位图片
    var heightArr=[],minBoxH=0,minBoxIndex=null;
    for(var i=0;i<boxes.length;i++){
        //求出每个盒子的高度
        var boxH=boxes[i].offsetHeight;
        if(i<cols){
            //将第一行盒子的高度放入数组中
            heightArr.push(boxH);
        }else{//除第一行外剩余的盒子
            //获取第一行的最矮的盒子
            minBoxH=_.min(heightArr);
            //获取最矮盒子的索引
            minBoxIndex=getMinBoxIndex(heightArr,minBoxH);
            //定位
            boxes[i].style.position='absolute';
            boxes[i].style.left=minBoxIndex*boxW+'px';
            boxes[i].style.top=minBoxH+'px';
            //更新数组中最矮盒子的高度
            heightArr[minBoxIndex]+=boxH;
        }
    }
    console.log(heightArr,minBoxH,minBoxIndex);
}

/**
 * 获取最矮盒子的索引
 * @param arr
 * @param minBoxH
 * @returns {number}
 */
function getMinBoxIndex(arr,minBoxH) {
        for(var i=0;i<arr.length;i++){
            if(arr[i]===minBoxH){
                return i;
            }
        }
}

/**
 * 判断是否继续加载图片
 */
function loadImgOrNot() {
    //获取最后一个盒子
    var boxes=$('main').getElementsByClassName('box');
    var lastBox=boxes[boxes.length-1];

    //求出最后一个盒子自身高度的一半处距离文档顶部的距离
    var lastBoxTop=lastBox.offsetHeight*0.5+lastBox.offsetTop;

    //求出屏幕的高度
    var screenH=document.documentElement.clientHeight||document.body.clientHeight;

    //求出滚动过的高度
    var scrollH=scroll().top;

    //判断是否继续加载
    return lastBoxTop<=screenH+scrollH;
}