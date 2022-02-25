
# ifndef mablung-makefile-environment-path
# export mablung-makefile-environment-path := $(shell npx mablung-makefile-environment get-path)
# endif

# include $(mablung-makefile-environment-path)

include node_modules/@virtualpatterns/mablung-makefile-environment/makefile

ifneq ($(is-building),true)
ifneq ($(is-cleaning),true)

pre-build::
	$(info - pre-build ----------------------------)
	$(if $(is-verbose),@echo copy .... .eslintrc.json babel.config.json)
	@npx shx cp -u node_modules/@virtualpatterns/mablung-makefile-environment/.eslintrc.json node_modules/@virtualpatterns/mablung-makefile-environment/babel.config.json .
	@$(MAKE) --no-print-directory commit message=post-pre-build include-commit-item=".eslintrc.json babel.config.json"

endif
endif
