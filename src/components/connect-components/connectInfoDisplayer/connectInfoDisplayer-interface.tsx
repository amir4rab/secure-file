export interface MainProps {
  id: string;
  secret: string;
};

export interface ChildProps extends MainProps {
  onCopy: ( value: string, copy?: boolean ) => void;
}


export default MainProps