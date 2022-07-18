# useclassname
The component style solution in react. Playground: https://stackblitz.com/edit/react-ts-ctghxg?file=App.tsx

```jsx
export default function Title({ emoji, title, custom }) {
  const cn = useClassName(styles, custom);

  return (
    <span className={cn.container}>
      <div className={cn.emoji}>{emoji}</div>
      <h1 className={cn.title}>{title}</h1>
    </span>
  );
}
```

<details>
<summary>scss module</summary>

```scss
.container {
  //...
  .emoji {
    //...
  }

  .title {
    //...
  }
}

```
</details>

```jsx
export default function App() {
  return (
    <div>
      <Title emoji="🍕" title="Default" />
      <Title emoji="🍳" title="Custom 1" custom={{ styles, id: 'custom1' }} />
      <Title emoji="🍔" title="Custom 2" custom={{ styles, id: 'custom2' }} />
    </div>
  );
}

```

<details>
<summary>scss module</summary>

```scss
.custom1_title {
  //...
}

.custom2_container {
  //...
}
```
</details>

## Hook

```js
import { useEffect, useState } from 'react';

export default function useClassName(base, custom) {
  const [styles, setStyles] = useState(base);

  useEffect(() => {
    if (!base || !custom) return;

    const baseClass = Object.entries(base);
    const customClass = Object.entries(custom.styles);
    const id = custom.id;

    const filter = Object.fromEntries(
      customClass.filter(([key]) => key.startsWith(custom.id))
    );

    const merge = baseClass.map(([key, value]) => {
      const x = filter[`${id}_${key}`];

      return x ? [key, `${value} ${x}`] : [key, value];
    });
    const obj = Object.fromEntries(merge);
    setStyles(obj);
    console.log(obj);
  }, [custom]);

  return styles;
}
```
