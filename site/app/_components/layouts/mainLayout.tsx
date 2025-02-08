import Avatar from "../ui/avatar";
import Navigation from "../ui/navigation";
import ConnectionRelatives from "../ui/sidebar/connectionRelatives";
import Stories from "../ui/sidebar/stories";

export default function MainLayout({ children }) {
  return (
    <div className="container my-16">
      <div className="grid grid-cols-main-layout">
        <div>
          <Avatar />
          <Navigation />
        </div>
        <div className="mx-10">
          {children}
        </div>
        <div className="flex flex-col gap-14">
          <Stories />
          <ConnectionRelatives />
        </div>
      </div>
    </div>
  )
}