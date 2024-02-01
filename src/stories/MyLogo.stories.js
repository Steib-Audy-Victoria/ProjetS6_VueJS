import MyLogo from '@/components/elements/MyLogo.vue';

export default {
  title: 'Elements/MyLogo',
  component: MyLogo,
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

export const LogoNoir = {
  render: (args) => {
    return {
      components: {
        MyLogo,
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

export const LogoBlanc = {
  ...LogoNoir,
  args: {
    color: "blanc",
  }
}




