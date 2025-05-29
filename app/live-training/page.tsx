import { RoleBasedView } from "@/components/role-based-view"
import SetterView from "./setter-view"
import CloserView from "./closer-view"
import ManagerView from "./manager-view"

export default function LiveTrainingPage() {
  return <RoleBasedView setterView={<SetterView />} closerView={<CloserView />} managerView={<ManagerView />} />
}
