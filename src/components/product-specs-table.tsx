import type { TechnicalSpecGroup } from "@/config/site-config";
import { Icon } from "@/components/icons";

type ProductSpecsTableProps = {
  specs: TechnicalSpecGroup[];
  productName: string;
};

export function ProductSpecsTable({ specs, productName }: ProductSpecsTableProps) {
  if (!specs || specs.length === 0) return null;

  return (
    <div className="space-y-8">
      {specs.map((group) => (
        <div
          key={group.group}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/80 px-5 py-4">
            <span className="grid size-8 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Icon name="settings" className="size-4" />
            </span>
            <h3 className="text-sm font-black text-ink-950 sm:text-base">
              {group.group}
            </h3>
          </div>

          <table className="w-full text-right text-sm">
            <caption className="sr-only">
              جدول مشخصات فنی {group.group} برای {productName}
            </caption>
            <tbody className="divide-y divide-slate-100">
              {group.items.map((item) => (
                <tr
                  key={item.label}
                  className="transition-colors hover:bg-slate-50/50"
                >
                  <th
                    scope="row"
                    className="w-1/3 p-4 font-bold text-slate-500 sm:w-1/4 sm:px-6"
                  >
                    {item.label}
                  </th>
                  <td className="p-4 font-black text-ink-950 sm:px-6">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
