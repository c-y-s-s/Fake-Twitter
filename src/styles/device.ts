interface SizesType {
  mobile: string;
  laptop: string;
  desktop: string;
}

const sizes: SizesType = {
  mobile: "722px",
  laptop: "1299px",
  desktop: "1300px",
};

export const devices = {
  mobile: `(max-width: ${sizes.mobile})`,
  laptop: `(max-width: ${sizes.laptop})`,
  desktop: `(min-width: ${sizes.desktop})`,
};
