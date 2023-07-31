const onUpdateTrigger = (table: string) => `
CREATE TRIGGER ${table}_updated_at
BEFORE UPDATE ON ${table}
FOR EACH ROW
EXECUTE PROCEDURE on_update_timestamp();
`;

const dropUpdateTrigger = (table: string) => `
DROP TRIGGER ${table}_updated_at
ON ${table}`;

export { onUpdateTrigger, dropUpdateTrigger };
