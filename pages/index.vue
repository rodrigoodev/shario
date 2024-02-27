<template>
  <Header>
    <div class="logo">
      <span>Shario</span>
    </div>
    <div class="search">
      <InputText
        class="search-input"
        placeholder="Aula de historias anos iniciais"
      />
      <div class="button">
        <Button icon="pi pi-search" />
      </div>
    </div>
    <div class="user">
      <Chip label="Rodrigo Gabriel" image="/assets/images/rodrigo.jpg" />
      <Button label="Logout" icon="pi pi-power-off" />
    </div>
  </Header>

  <main>
    <h2>Aqui estão os materiais mais recentes</h2>
    <div class="wrap-conteudo">
      <a href="#" class="conteudo" v-for="x in 5">
        <div class="conteudo-header">
          <div class="conteudo-logo">
            <img src="/assets/images/rodrigo.jpg" />
          </div>

          Atividade de historia - anos iniciais
        </div>
        <div class="conteudo-info">
          <span>Publicado em 12/09/2021</span>
          <span>3 min de leitura</span>
        </div>
      </a>
    </div>
  </main>
  <Button
    class="button-subir-material"
    label="Subir material"
    icon="pi pi-plus"
    @click="visible = true"
  />

  <Dialog
    v-model:visible="visible"
    modal
    header="Adicionar material"
    :style="{ width: '25rem' }"
  >
    <div class="form-field-material">
      <label for="username" class="font-semibold w-6rem">Titulo</label>
      <InputText id="username" class="flex-auto" autocomplete="off" />
    </div>
    <div class="form-field-material">
      <label for="email" class="font-semibold w-6rem">Arquivo</label>
      <FileUpload
        mode="basic"
        name="demo[]"
        url="/api/upload"
        accept="image/*"
        :maxFileSize="1000000"
      />
    </div>
    <div class="form-field-material">
      <label for="email" class="font-semibold w-6rem">BNCC</label>
      <InputText id="email" class="flex-auto" autocomplete="off" />
    </div>

    <div class="form-field-material">
      <label for="email" class="font-semibold w-6rem">Máteria</label>
      <AutoComplete
        v-model="selectedCountry"
        optionLabel="label"
        :suggestions="filteredCountries"
        @complete="search"
      />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="visible = false"
      ></Button>
      <Button type="button" label="Save" @click="visible = false"></Button>
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import Menu from "primevue/menu";

const menu = ref(null);
const toast = useToast();
const router = useRouter();
const value = ref({ label: "", icon: "" });

const visible = ref(false);

onMounted(() => {
  countries.value = [
    {
      label: "Australia",
      code: "AU",
    },
    {
      label: "Brazil",
      code: "BR",
    },
    {
      label: "China",
      code: "CN",
    },
    {
      label: "Egypt",
      code: "EG",
    },
    {
      label: "France",
      code: "FR",
    },
    {
      label: "Germany",
      code: "DE",
    },
    {
      label: "India",
      code: "IN",
    },
    {
      label: "Japan",
      code: "JP",
    },
    {
      label: "Spain",
      code: "ES",
    },
    {
      label: "United States",
      code: "US",
    },
  ];
});

const countries = ref();
const selectedCountry = ref();
const filteredCountries = ref();

const search = (event) => {
  setTimeout(() => {
    if (!event.query.trim().length) {
      filteredCountries.value = [...countries.value];
    } else {
      filteredCountries.value = countries.value.filter((country) => {
        return country.label
          .toLowerCase()
          .startsWith(event.query.toLowerCase());
      });
    }
  }, 250);
};

const itemsMateria = ref([
  {
    label: "Matemática",
    icon: "pi pi-refresh",
  },
  {
    label: "Português",
    icon: "pi pi-search",
  },
  {
    label: "História",
    icon: "pi pi-times",
  },
]);

const items = ref([
  {
    label: "Refresh",
    icon: "pi pi-refresh",
  },
  {
    label: "Search",
    icon: "pi pi-search",
  },
  {
    separator: true,
  },
  {
    label: "Delete",
    icon: "pi pi-times",
  },
]);

const toggle = (event) => {
  menu.value.toggle(event);
};

const save = () => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Data Saved",
    life: 3000,
  });
};
</script>

<style>
header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
}

.search {
  display: flex;
  align-items: center;
  gap: 8px;
}

.search-input {
  width: 600px;
}

.user {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.content-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.wrap-conteudo {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  border-radius: 8px;
  font-weight: bold;
}

.wrap-conteudo a {
  text-decoration: none;
  color: var(--text-color);
}

.conteudo {
  border: 1px solid var(--surface-300);
  border-radius: 8px;
  font-weight: bold;
}

.conteudo-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--surface-0);
  border-radius: 8px;
}

.conteudo-logo img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.conteudo-info {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--surface-50);
}

.button-subir-material {
  position: fixed;
  bottom: 20px;
  right: 20px;
  font-weight: bold;
  background-color: var(--blue-500);
  color: var(--surface-0);
  border: none;
  padding: 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s;
  width: 300px;
}

.form-field-material {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 1rem;
  margin-bottom: 12px;
}
</style>
