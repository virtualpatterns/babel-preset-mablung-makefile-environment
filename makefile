
# ifndef mablung-makefile-environment-path
# export mablung-makefile-environment-path := $(shell npx mablung-makefile-environment get-path)
# endif

# include $(mablung-makefile-environment-path)

include node_modules/@virtualpatterns/mablung-makefile-environment/makefile

ifneq ($(is-building),true)
ifneq ($(is-cleaning),true)

pre-build::
	$(info - pre-build ----------------------------)
	@npx shx cp -u node_modules/@virtualpatterns/mablung-makefile-environment/.eslintrc.json .
	@npx shx cp -u node_modules/@virtualpatterns/mablung-makefile-environment/babel.config.json .

endif
endif
