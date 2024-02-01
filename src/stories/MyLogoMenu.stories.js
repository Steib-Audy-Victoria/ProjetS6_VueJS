import MyLogoMenu from '@/components/elements/MyLogoMenu.vue';

export default {
  title: 'Elements/MyLogoMenu',
  component: MyLogoMenu,
  argTypes: {
    color: {
      control: "select",
      options: ['black', 'blanc']
    },
    size: {
      control: "select",
      options: ['default', 'petit', 'moyen', 'grand']
    },
  } 
}

export const LogoMenuNoir = {
  render: (args) => {
    return {
      components: {
        MyLogoMenu,
      },
      setup(){
        return { args }
      },
    }
  },
  args: {
    color: "black",
  }
}

export const LogoMenuBlanc = {
  ...LogoMenuNoir,
  args: {
    color: "blanc",
  }
}




