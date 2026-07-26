import { useRouteContext } from "@tanstack/react-router";
import type { PublicLayoutProps } from "@/features/theme/contract/layouts";
import { BackToTop } from "../components/control/back-to-top";
import { Sidebar } from "../components/sidebar";
import { MobileMenu } from "./mobile-menu";
import { Navbar } from "./navbar";

/**
 * 公共页布局：顶部 Win7 任务栏 + 桌面区（左标签列 + 右文章列）。
 * 壁纸来源：
 *   1. 后台 siteConfig.theme.aero7.homeBg（aero7 主题设置）
 *   2. 后台 siteConfig.theme.default.background.homeImage（首页）/
 *      globalImage（其它页） — DefaultThemeSettings 的字段
 *   3. CSS 兜底（var(--fuwari-page-bg) 渐变）
 * 没有 fallback 到包底 /images/aero-wallpaper.jpg —— 真实场景中后台
 * 一定会配置；若为空就只用渐变兜底。
 */
export function PublicLayout({
  children,
  navOptions,
  user,
  isSessionLoading,
  logout,
}: PublicLayoutProps) {
  const ctx = useRouteContext({ from: "__root__" });
  const siteConfig = ctx.siteConfig;
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  const isHome = pathname === "/" || pathname === "";

  const aero7HomeBg = siteConfig.theme.aero7?.homeBg;
  const defaultBg = siteConfig.theme.default?.background;
  const bgUrl = isHome
    ? aero7HomeBg || defaultBg?.homeImage
    : aero7HomeBg ||
      defaultBg?.globalImage ||
      defaultBg?.homeImage;

  return (
    <div className="aero7-theme relative flex h-screen flex-col overflow-hidden">
      {/* 桌面壁纸：跟随用户后台设置；无设置时透明，靠 body 渐变兜底 */}
      {bgUrl && (
        <div
          aria-hidden="true"
          className="aero-desktop-wallpaper"
          style={{ backgroundImage: `url("${bgUrl}")` }}
        />
      )}

      <MobileMenu
        navOptions={navOptions}
        isOpen={false}
        onClose={() => {}}
        user={user}
        logout={logout}
      />

      {/* Win7 任务栏 */}
      <Navbar
        navOptions={navOptions}
        onMenuClick={() => {}}
        user={user}
        isLoading={isSessionLoading}
      />

      {/* 桌面区 */}
      <div className="aero-desktop">
        <div className="aero-desktop-content">
          <aside className="aero-desktop-sidebar">
            <Sidebar />
          </aside>
          <main className="aero-desktop-main">{children}</main>
        </div>
      </div>

      <BackToTop />
    </div>
  );
}
