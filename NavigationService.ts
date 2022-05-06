let OpenLeftDrawer: () => void;

let SetOpenDrawer = (f: () => void) => {
	OpenLeftDrawer = f;
};

let OpenDrawerRight: () => void;

let SetOpenDrawerRight = (f: () => void) => {
	OpenDrawerRight = f;
};

export { SetOpenDrawer, OpenLeftDrawer, SetOpenDrawerRight, OpenDrawerRight };
