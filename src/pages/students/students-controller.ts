import { useEffect } from "react";

import { MENU_ITEMS_KEY, onMenuSelectedItemChange } from "../../utills";

const useStudentsController = () => {
  useEffect(() => {
    onMenuSelectedItemChange(MENU_ITEMS_KEY.STUDENTS);
  }, []);
};

export default useStudentsController;
