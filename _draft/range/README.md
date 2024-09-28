给定多条规则 r, 每条规则可能包含多个限制因子 f.
采用如下结构描述规则和限制因子。

```js
const rules = [
  {
    ruleName: 'a',
    factors:  [
      {
        factorName: 'f1',
        operator: '>',
        value: 10
      },
      {
        factorName: 'f2',
        operator: '>',
        value: 10
      },
    ]
  },
  {
    ruleName: 'b',
    factors:  [
      {
        factorName: 'f2',
        operator: '>',
        value: 10
      },
      {
        factorName: 'f2',
        operator: '>',
        value: 10
      },
    ]
  },
]
```

需要同时满足如下条件
1. 每条规则对应的多个因子之间为与逻辑，必须保证单条规则因子对应的交集非空
2. 多条规则之间的因子条件不能出现交集