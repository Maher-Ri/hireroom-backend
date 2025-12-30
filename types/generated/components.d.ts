import type { Schema, Struct } from '@strapi/strapi';

export interface SharedTextArray extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_arrays';
  info: {
    displayName: 'TextArray';
    icon: 'bulletList';
  };
  attributes: {
    text: Schema.Attribute.Text;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.text-array': SharedTextArray;
    }
  }
}
