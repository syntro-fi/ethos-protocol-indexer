import { ModuleRegistry, EthosModule } from "generated";

import { ModuleRegistry_ModuleCategory } from "./ethos-enums";

const MODULE_CATEGORIES = Object.values(ModuleRegistry_ModuleCategory);

ModuleRegistry.ModuleRegistered.handler(async ({ event, context }) => {
  const categoryId = event.params.category;
  const entity: EthosModule = {
    id: event.params.id,
    address: event.params.module,
    name: event.params.name,
    categoryName: MODULE_CATEGORIES[Number(categoryId)],
    categoryId,
  };

  context.EthosModule.set(entity);
});

ModuleRegistry.ModuleRemoved.handler(async ({ event, context }) => {
  const moduleId = event.params.id;
  context.EthosModule.deleteUnsafe(moduleId);
});
