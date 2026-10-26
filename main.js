/* ============================================================
   无畏契约兴趣站 · 交互脚本
   两个功能:
   1. 反应速度测试(reaction.html)
   2. 返回顶部按钮(games.html)
   ============================================================ */

/* ---------- 1. 反应速度测试 ---------- */
var box = document.getElementById('test-box');

// 只有 reaction 页面有这个盒子,别的页面没有,所以先判断一下
if (box) {

  var result = document.getElementById('result');
  var bestEl = document.getElementById('best-time');

  var state = 'idle';   // 状态: idle = 按下开始, waiting = 等待变绿, ready = 可以按下
  var timer = null;     // 保存定时器,用来取消
  var startTime = 0;    // 变绿那一刻的时间
  var best = 0;         // 最快记录

  // 用 mousedown(按下瞬间)触发,比 click(松开才触发)计时更准
  box.onmousedown = function () {

    // 情况一:还没开始,按一下进入"等待变绿"
    if (state === 'idle') {
      state = 'waiting';
      box.textContent = '等待变绿……';
      box.className = 'test-box waiting';

      // 随机等 1 到 4 秒后变绿(随机很重要,否则能靠节奏抢跑)
      var delay = 1000 + Math.floor(Math.random() * 3000);

      timer = setTimeout(function () {
        state = 'ready';
        startTime = Date.now();
        box.textContent = '按下！';
        box.className = 'test-box ready';
      }, delay);

    // 情况二:还没变绿就按了 = 抢跑,取消定时器重新来
    } else if (state === 'waiting') {
      clearTimeout(timer);
      result.textContent = '抢跑了!等变绿再按。';
      state = 'idle';
      box.textContent = '按下重新开始';
      box.className = 'test-box';

    // 情况三:已经变绿,按下就算出反应时间
    } else if (state === 'ready') {
      var ms = Date.now() - startTime;
      result.textContent = '你的反应时间是 ' + ms + ' 毫秒';

      // 记录最快成绩
      if (best === 0 || ms < best) {
        best = ms;
        bestEl.textContent = '最快记录:' + best + ' 毫秒';
      }

      state = 'idle';
      box.textContent = '再按一次';
      box.className = 'test-box';
    }
  };
}

/* ---------- 2. 返回顶部按钮 ---------- */
var btn = document.getElementById('back-to-top');

// 只有 games 页面有这个按钮,先判断一下
if (btn) {

  // 往下滚超过 600 像素才显示按钮
  window.onscroll = function backToTop() {
    if (window.scrollY > 600) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  };

  // 点击后回到页面顶部
  btn.onclick = function backToTop() {
    window.scrollTo(0, 0);
  };
}
