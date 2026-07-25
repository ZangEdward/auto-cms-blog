import type { CSSProperties } from "react";
import type { SiteConfig } from "@/features/config/site-config.schema";

/**
 * 把站点配置映射成注入 <html> 的 CSS 变量。
 * - 默认使用经典 Win7 窗口蓝（--fuwari-hue）。
 * - 若后台在 aero7 主题配置中设置了 accentColor，则同时覆盖
 *   7.css 的窗口主色 --w7-w-bg 与主题主色 --fuwari-primary。
 */
export function getAero7ThemeStyle(siteConfig: SiteConfig): CSSProperties {
  const style: Record<string, string> = {
    "--fuwari-hue": "215",
  };

  const accent = siteConfig.theme.aero7?.accentColor;
  if (accent) {
    style["--w7-w-bg"] = accent;
    style["--fuwari-primary"] = accent;
  }

  return style as CSSProperties;
}
