<script>
export default {
    name: 'SectionHeader',
    props: {
        title: {
            default: '',
            type: String
        }
    }
}
</script>

<template>
    <section>
        <div class="px-8 pt-8 pb-2 bg-gray-700">
            <div class="pb-6">
                <div class="flex justify-between -mx-4">
                    <div class="px-4">
                        <h4 class="text-2xl font-bold text-white tracking-wide leading-6 mb-1">{{ title }}</h4>
                        <p class="text-xs leading-5 text-gray-300"></p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>

</style>