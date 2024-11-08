import { runTestSuite, TEST_SUITE } from "../utils/autoRunTest.ts";
import DoublyLinkedList from "./DoublyLinkedList.ts";

const testData: TEST_SUITE = {
  "search": {
    "search in empty link": [
      [10],
      undefined,
      (data) => {
        const list = new DoublyLinkedList();
        return list.search(data);
      },
    ],
    "search in one link": [
      [10, ],
      undefined,
      (data) => {
        const list = new DoublyLinkedList();
        return list.search(data);
      },
    ],
  },
};

runTestSuite(testData);
