import { getSchemas, getTables } from "@/app/actions";
import TableExplorer from "@/components/table-explorer";
import { redirect } from "next/navigation";

export default async function SchemaPage({
  params,
}: {
  params: { schema: string };
}) {
  try {
    const [schemas, tables] = await Promise.all([
      getSchemas(),
      getTables(params.schema),
    ]);

    return (
      <TableExplorer
        currentSchema={params.schema}
        schemas={schemas.map((s) => s.schema_name)}
        tables={tables.map((t) => t.table_name)}
        totalRecords={0}
      />
    );
  } catch (error) {
    console.error("Error in SchemaPage:", error);
    redirect("/");
  }
}

export async function generateStaticParams() {
  try {
    const schemas = await getSchemas();
    return schemas.map((schema) => ({
      schema: schema.schema_name,
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}
