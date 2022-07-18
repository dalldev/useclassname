import { useEffect, useState } from "react";

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
