interface AreaItem {
  code: string;
  name: string;
  value?: string;
}

interface SelectItem {
  communityCode?: string;
  communityName?: string;
  cityCode?: string;
  cityName?: string;
  joinStoreCode: string;
  joinStoreName: string;
  value?: string;
  children?: AreaItem[];
}

interface OptionsItem {
  value?: string;
  key: string;
  label: string;
  children?: OptionsItem[];
}

interface IEditArea {
  key: string[];
  options: OptionsItem[];
}
