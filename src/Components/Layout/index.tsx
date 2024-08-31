import { Navigate, Outlet, useParams } from "react-router-dom";
import { Note } from "../../types";

const Layout = ({ notes }: { notes: Note[] }) => {
  //* Urldeki ID yi al
  const { id } = useParams();

  //? Notes dizisinde elemanı ara
  const found = notes.find((i) => i.id === id);

  //~ bulamazsa anasayfaya yönlendir
  if (!found) return <Navigate to={"/"} replace />;

  return <Outlet context={found} />;
};

export default Layout;
