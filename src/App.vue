<template>
    <Suspense>
        <router-view></router-view>
        <template #fallback>
            <p>Cargando...</p>
        </template>
    </Suspense>
</template>