import { RoleBasedView } from "@/components/role-based-view"
import ManagerView from "./manager-view"
import SetterView from "./setter-view"
import CloserView from "./closer-view"

export default function CallAnalysisPage() {
  return <RoleBasedView managerView={<ManagerView />} setterView={<SetterView />} closerView={<CloserView />} />
}
