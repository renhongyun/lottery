import hyRequest from "../request";

export function getLatestLottery() {
  return hyRequest.get({
    url: "/record/latest",
  });
}

export function getLotteryHistory() {
  return hyRequest.get({
    url: "/record/list",
  });
}

export function getTaskList() {
  return hyRequest.get({
    url: "/task/list",
  });
}

export function getConfigInfo() {
  return hyRequest.get({
    url: "/config/get",
  });
}
