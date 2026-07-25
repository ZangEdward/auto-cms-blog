import { useController, useFormContext } from "react-hook-form";
import { AssetUploadField } from "@/features/config/components/asset-upload-field";
import { Field } from "@/features/config/components/site-settings-fields";
import type { SystemConfig } from "@/features/config/config.schema";
import { m } from "@/paraglide/messages";

const DEFAULT_ACCENT = "#2a7fd0";

function Aero7AccentColorField() {
  const { control } = useFormContext<SystemConfig>();
  const { field } = useController({
    control,
    name: "site.theme.aero7.accentColor",
  });

  const value =
    typeof field.value === "string" && field.value ? field.value : DEFAULT_ACCENT;

  return (
    <Field
      label={m.settings_site_field_accent_color()}
      hint={m.settings_site_field_accent_color_hint()}
    >
      <div className="flex items-center gap-3">
        <input
          type="color"
          aria-label="accent color picker"
          value={value}
          onChange={(event) => field.onChange(event.target.value)}
          className="h-10 w-14 cursor-pointer rounded-md border border-border/40 bg-transparent"
        />
        <input
          type="text"
          value={value}
          onChange={(event) => field.onChange(event.target.value)}
          placeholder={DEFAULT_ACCENT}
          className="h-10 flex-1 rounded-md border border-border/40 bg-background px-3 font-mono text-sm text-foreground"
        />
      </div>
    </Field>
  );
}

export function Aero7ThemeSettings() {
  const {
    formState: { errors },
  } = useFormContext<SystemConfig>();

  return (
    <>
      <AssetUploadField
        name="site.theme.aero7.homeBg"
        assetPath="themes/aero7/home-bg.webp"
        accept=".png,.webp,.jpg,.jpeg"
        label={m.settings_site_field_home_image()}
        hint={m.settings_site_field_home_image_hint()}
        placeholder="/images/asset/themes/aero7/home-bg.webp or https://picsum.photos/1600/900"
        error={errors.site?.theme?.aero7?.homeBg?.message}
      />
      <Aero7AccentColorField />
    </>
  );
}
