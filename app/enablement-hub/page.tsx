import { RoleBasedView } from "@/components/role-based-view"
import SetterEnablementHub from "./setter-view"
import CloserEnablementHub from "./closer-view"
import ManagerEnablementHub from "./manager-view"

export default function EnablementHub() {
  return (
    <RoleBasedView
      setterView={<SetterEnablementHub />}
      closerView={<CloserEnablementHub />}
      managerView={<ManagerEnablementHub />}
    />
  )
}
