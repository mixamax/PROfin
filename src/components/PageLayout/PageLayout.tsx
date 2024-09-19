import style from "./pageLayout.module.css";

interface PageLayoutProps {
    children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
    return <div className={style.pageLayout}>{children}</div>;
}
