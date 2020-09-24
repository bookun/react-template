import { atom, selector } from "recoil";

export type mockContent = {
  id: string;
  name: string;
  phone: string;
  zoomUrl: string;
  start: string;
  end: string;
  plan: number;
};

const todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today
export const contents: mockContent[] = [
  {
    id: "0",
    name: "oliva",
    phone: "090-xxxx-xxxx",
    zoomUrl: "https://zoom.us/oliva",
    start: todayStr + "T12:00:00",
    end: todayStr + "T13:00:00",
    plan: 0,
  },
  {
    id: "1",
    name: "cappyzawa",
    phone: "090-xxxx-xxxx",
    zoomUrl: "https://zoom.us/cappyzawa",
    start: todayStr + "T15:00:00",
    end: todayStr + "T17:00:00",
    plan: 1,
  },
  {
    id: "2",
    name: "zokk",
    phone: "090-xxxx-xxxx",
    zoomUrl: "https://zoom.us/zokk",
    start: "2020-09-22T15:00:00",
    end: "2020-09-22T17:00:00",
    plan: 1,
  },
];

export const focusEventIdState = atom({
  key: "focusEventIdState",
  default: "-1",
});

export const focusEventFlagState = selector({
  key: "focusEventFlagState",
  get: ({ get }) => {
    return get(focusEventIdState) !== "-1";
  },
});

export const eventContentState = selector({
  key: "eventContentState",
  get: ({ get }) => {
    const id = get(focusEventIdState);
    const idNum = Number(id);
    return contents[idNum];
  },
});
