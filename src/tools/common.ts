import moment from "moment";

export const getQueryParam = (key: string) => {
  let reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  let result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
};

//判断对象是否为空
export const isNullValue = (input: any) => {
  return (
    input === undefined ||
    input === null ||
    input === "" ||
    String(input).trim() === ""
  );
};

const formatNum = (num: number) => {
  if (num >= 10) return num;
  return "0" + num;
};
// 距离报名结束
export const deitanseEnd = (endTime: number) => {
  const currentTimeStamp = moment().valueOf();
  const entTimeStamp = moment(endTime)
    .endOf("second")
    .valueOf();
  const distanseTimeStamp = entTimeStamp - currentTimeStamp;
  if (distanseTimeStamp <= 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0
    };
  }
  // 距离结束天
  const aDayTimeStamp = 24 * 60 * 60 * 1000;
  const aHourTimeStamp = 60 * 60 * 1000;
  const aMinuteTimeStamp = 60 * 1000;
  const dDay = Math.floor(distanseTimeStamp / aDayTimeStamp);
  const dHour = Math.floor(
    (distanseTimeStamp - dDay * aDayTimeStamp) / aHourTimeStamp
  );
  const dMinute = Math.floor(
    (distanseTimeStamp - dDay * aDayTimeStamp - dHour * aHourTimeStamp) /
      aMinuteTimeStamp
  );
  return {
    day: formatNum(dDay),
    hour: formatNum(dHour),
    minute: formatNum(dMinute)
  };
};
// 距离每个时间结束
export const deitanseTime = (time: number) => {
  const currentTimeStamp = moment().valueOf();
  const entTimeStamp = moment(time)
    .endOf("second")
    .valueOf();
  const distanseTimeStamp = entTimeStamp - currentTimeStamp;
  if (distanseTimeStamp <= 0) {
    return {
      day: 0,
      hour: 0,
      minute: 0
    };
  }
  // 距离结束天
  const aDayTimeStamp = 24 * 60 * 60 * 1000;
  const aHourTimeStamp = 60 * 60 * 1000;
  const aMinuteTimeStamp = 60 * 1000;
  const dDay = Math.floor(distanseTimeStamp / aDayTimeStamp);
  const dHour = Math.floor(
    (distanseTimeStamp - dDay * aDayTimeStamp) / aHourTimeStamp
  );
  const dMinute = Math.floor(
    (distanseTimeStamp - dDay * aDayTimeStamp - dHour * aHourTimeStamp) /
      aMinuteTimeStamp
  );
  return {
    day: dDay,
    hour: dHour,
    minute: dMinute
  };
};

export const getTimestr = (status: number, startTime: any, endTime: any) => {
  let timeStr = "";
  if (status === 1) {
    const { day, hour, minute } = deitanseTime(startTime);
    timeStr = `距活动开始还有${
      day === 0 ? (hour === 0 ? minute + "分钟" : hour + "小时") : day + "天"
    }`;
  } else if (status === 3) {
    const { day, hour, minute } = deitanseTime(endTime);
    timeStr = `距活动结束还有${
      day === 0 ? (hour === 0 ? minute + "分钟" : hour + "小时") : day + "天"
    }`;
  } else {
    timeStr = `${moment(startTime).format("YYYY/MM/DD HH:mm")}-${moment(
      endTime
    ).format("YYYY/MM/DD HH:mm")}`;
  }
  return timeStr;
};

//设置cookie的值
export const setCookie = (cname: string, cvalue: string) => {
  document.cookie = cname + "=" + escape(cvalue) + ";" + "path=/;";
};

//获取指定名称的cookie的值
export const getCookie = (key: string) => {
  var arrStr = document.cookie.split("; ");
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split("=");
    if (temp[0] === key) return unescape(temp.slice(1).join("="));
  }
  return "";
};

export const copyText = (text: string) => {
  // 数字没有 .length 不能执行selectText 需要转化成字符串
  const textString = text.toString();
  let input: any = document.querySelector("#copy-input");
  if (!input) {
    input = document.createElement("input");
    input.id = "copy-input";
    input.readOnly = "readOnly"; // 防止ios聚焦触发键盘事件
    input.style.position = "absolute";
    input.style.left = "-1000px";
    input.style.zIndex = "-1000";
    document.body.appendChild(input);
  }

  input.value = textString;
  // ios必须先选中文字且不支持 input.select();
  selectText(input, 0, textString.length);
  // console.log(document.execCommand("copy"), "execCommand");
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    alert("已复制到粘贴板");
  }
  input.blur();
  // input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
  // 选择文本。createTextRange(setSelectionRange)是input方法
  function selectText(textbox: any, startIndex: any, stopIndex: any) {
    if (textbox.createTextRange) {
      //ie
      const range = textbox.createTextRange();
      range.collapse(true);
      range.moveStart("character", startIndex); //起始光标
      range.moveEnd("character", stopIndex - startIndex); //结束光标
      range.select(); //不兼容苹果
    } else {
      //firefox/chrome
      textbox.setSelectionRange(startIndex, stopIndex);
      textbox.focus();
    }
  }
};

export const isSpeciText = (text: string) => {
  if (
    /[^\u0020-\u007E\u00A0-\u00BE\u2E80-\uA4CF\uF900-\uFAFF\uFE30-\uFE4F\uFF00-\uFFEF\u0080-\u009F\u2000-\u201f\u2026\u2022\u20ac\r\n]/g.test(
      text
    )
  ) {
    return true;
  }
  if (isEmojiCharacter(text.trim())) {
    return true;
  } else {
    return false;
  }
};

export const isEmojiCharacter = (substring: string) => {
  for (let i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (substring.length > 1) {
      const ls = substring.charCodeAt(i + 1);
      if (ls === 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2b05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (
        hs === 0xa9 ||
        hs === 0xae ||
        hs === 0x303d ||
        hs === 0x3030 ||
        hs === 0x2b55 ||
        hs === 0x2b1c ||
        hs === 0x2b1b ||
        hs === 0x2b50
      ) {
        return true;
      }
    }
  }
};

// 自定义滑动切换tab事件开始
export const handleTouchStart = (evt: any) => {
  let startObj = {
    x1: evt.touches[0].pageX,
    y1: evt.touches[0].pageY,
    now: new Date().getTime()
  };
  return startObj;
};
// 自定义滑动切换tab事件移动
export const handleTouchMove = (
  evt: any,
  startObj: any,
  active: number,
  tabMaxIndex: number
) => {
  let x2 = evt.touches[0].pageX;
  let y2 = evt.touches[0].pageY;
  let { x1, y1, now } = startObj;
  let activeindex = active;

  if (now && new Date().getTime() - now > 100) {
    startObj.now = null;
    let dir =
      Math.abs(x1 - x2) >= Math.abs(y1 - y2)
        ? x1 - x2 > 0
          ? "Left"
          : "Right"
        : y1 - y2 > 0
        ? "Up"
        : "Down";
    if (dir === "Left") {
      //加判断  不能越界
      if (activeindex < tabMaxIndex) {
        activeindex++;
      }
    } else if (dir === "Right") {
      //加判断  不能越界
      if (activeindex > 0) {
        activeindex--;
      }
    }
  }
  return activeindex;
};
