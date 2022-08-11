import { ref } from "vue";
import PageModal from "@/components/page-modal";

type callback = () => void;

export function usePageModal(newCb?: callback, editCb?: callback) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>();
  const defaultInfo = ref({});
  // 新建
  const handleNewData = () => {
    defaultInfo.value = {};
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    newCb && newCb();
  };

  // 修改
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item };
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true;
    }
    editCb && editCb();
  };

  return [pageModalRef, defaultInfo, handleNewData, handleEditData];
}
